import React, { useContext, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  createTheme,
  keyframes,
  Switch,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { CartContext } from "../contexts/CartContext";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  differenceInDays,
  differenceInHours,
  setHours,
  setMinutes,
} from "date-fns";
import { enGB } from "date-fns/locale";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const colorChange = keyframes`
  0% { color: #1976d2; }
  50% { color: #dc004e; }
  100% { color: #1976d2; }
`;

const calculateRent = (
  startDate: Date,
  endDate: Date,
  dailyRate: number,
  quantity: number
): number => {
  const days = differenceInDays(endDate, startDate) || 1;
  return dailyRate * days * quantity;
};

const calculateHourlyRate = (dailyRate: number): number => {
  const hourlyRate = (dailyRate / 24) * 1.2; // 20% more than the daily rate divided by 24 hours
  return Math.round(hourlyRate * 100) / 100; // Round to 2 decimal places
};

const calculateHourlyRent = (
  startDate: Date,
  endDate: Date,
  dailyRate: number,
  quantity: number
): number => {
  const hours = Math.max(differenceInHours(endDate, startDate), 1);
  const hourlyRate = calculateHourlyRate(dailyRate);
  return Math.round(hourlyRate * hours * quantity * 100) / 100;
};

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, updateDates } =
    useContext(CartContext);
  const [hourlyCalculations, setHourlyCalculations] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleHourlyCalculation = (itemName: string) => {
    setHourlyCalculations((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const updateDateAndTime = (
    itemName: string,
    isStartDate: boolean,
    newDate: Date | null,
    newTime: Date | null
  ) => {
    const item = cart.find((i) => i.name === itemName);
    if (item) {
      let updatedDate = isStartDate ? item.startDate : item.returnDate;
      if (newDate) {
        updatedDate = new Date(newDate);
      }
      if (newTime) {
        updatedDate = setHours(
          setMinutes(updatedDate, newTime.getMinutes()),
          newTime.getHours()
        );
      }
      updateDates(
        itemName,
        isStartDate ? updatedDate : item.startDate,
        isStartDate ? item.returnDate : updatedDate
      );
    }
  };

  // Calculate totals
  const subtotal = cart.reduce((total, item) => {
    return (
      total +
      calculateRent(
        item.startDate,
        item.returnDate,
        item.rentalPrice,
        item.quantity
      )
    );
  }, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
        <Container maxWidth="lg" sx={{ mt: -4, mb: 4 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              animation: `${colorChange} 3s infinite`,
              "&:hover": {
                animation: "none",
                color: "secondary.main",
              },
            }}
          >
            Your Shopping Cart
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              {cart.map((item) => (
                <Paper
                  key={item.name}
                  elevation={3}
                  sx={{
                    mb: 3,
                    p: 3,
                    borderRadius: 2,
                    transition: "all 0.3s",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: 8,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Typography
                        variant="h5"
                        sx={{ mb: 2, fontWeight: "bold" }}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        Refundable Security: ₹{item.refundableSecurity}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        Rent: ₹{item.rentalPrice}/Day (₹
                        {calculateHourlyRate(item.rentalPrice)}/Hour)
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={hourlyCalculations[item.name] || false}
                            onChange={() => toggleHourlyCalculation(item.name)}
                          />
                        }
                        label="Calculate by hour"
                      />
                      {hourlyCalculations[item.name] ? (
                        <Typography
                          variant="body1"
                          sx={{ mb: 2, fontWeight: "bold" }}
                        >
                          Total Rent (Hourly): ₹
                          {calculateHourlyRent(
                            item.startDate,
                            item.returnDate,
                            item.rentalPrice,
                            item.quantity
                          )}
                          {item.quantity > 1 &&
                            ` (₹${calculateHourlyRate(item.rentalPrice)} x ${
                              differenceInHours(
                                item.returnDate,
                                item.startDate
                              ) || 1
                            } hours x ${item.quantity} items)`}
                        </Typography>
                      ) : (
                        <Typography
                          variant="body1"
                          sx={{ mb: 2, fontWeight: "bold" }}
                        >
                          Total Rent (Daily): ₹
                          {calculateRent(
                            item.startDate,
                            item.returnDate,
                            item.rentalPrice,
                            item.quantity
                          )}
                          {item.quantity > 1 &&
                            ` (₹${item.rentalPrice} x ${
                              differenceInDays(
                                item.returnDate,
                                item.startDate
                              ) || 1
                            } days x ${item.quantity} items)`}
                        </Typography>
                      )}
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Typography sx={{ mr: 2 }}>Qty:</Typography>
                        <TextField
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.name, parseInt(e.target.value))
                          }
                          inputProps={{ min: 1 }}
                          size="small"
                          sx={{ width: "70px" }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        <DatePicker
                          label="Start Date"
                          value={item.startDate}
                          onChange={(newValue) =>
                            updateDateAndTime(item.name, true, newValue, null)
                          }
                          slotProps={{
                            textField: { size: "small", sx: { width: "48%" } },
                          }}
                        />
                        <TimePicker
                          label="Start Time"
                          value={item.startDate}
                          onChange={(newValue) =>
                            updateDateAndTime(item.name, true, null, newValue)
                          }
                          slotProps={{
                            textField: { size: "small", sx: { width: "48%" } },
                          }}
                        />
                        <DatePicker
                          label="Return Date"
                          value={item.returnDate}
                          onChange={(newValue) =>
                            updateDateAndTime(item.name, false, newValue, null)
                          }
                          slotProps={{
                            textField: { size: "small", sx: { width: "48%" } },
                          }}
                        />
                        <TimePicker
                          label="Return Time"
                          value={item.returnDate}
                          onChange={(newValue) =>
                            updateDateAndTime(item.name, false, null, newValue)
                          }
                          slotProps={{
                            textField: { size: "small", sx: { width: "48%" } },
                          }}
                        />
                      </Box>
                      <Button
                        onClick={() => removeFromCart(item.name)}
                        variant="outlined"
                        color="secondary"
                        sx={{ mt: 1 }}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  position: "sticky",
                  top: 100,
                  alignSelf: "flex-start",
                  backgroundColor: "background.paper",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  Summary
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ mb: 1, color: "text.secondary" }}
                  >
                    One Time Payable
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography>Refundable Security</Typography>
                    <Typography fontWeight="bold">
                      ₹
                      {cart.reduce(
                        (total, item) => total + item.refundableSecurity,
                        0
                      )}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ mb: 1, color: "text.secondary" }}
                  >
                    Rent Payable
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography>Day Rent</Typography>
                    <Typography>₹{subtotal.toFixed(2)}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography>Tax</Typography>
                    <Typography>₹{tax.toFixed(2)}</Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                    fontWeight: "bold",
                  }}
                >
                  <Typography variant="h5">Total</Typography>
                  <Typography variant="h5" color="primary.main">
                    ₹{total.toFixed(2)}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  Proceed To Checkout
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default CartPage;
