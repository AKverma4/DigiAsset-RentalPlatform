import React, { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  rentalType: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    rentalType: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to an API)
    console.log('Form submitted:', formData);
  };

  const sectionStyle: React.CSSProperties = {
    padding: '60px 0',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '600px',
    width: '100%',
    margin: '0 auto',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '32px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  };

  const descriptionStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#666',
    fontSize: '16px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#444',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    padding: '14px 24px',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    width: '100%',
    marginTop: '20px',
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>Contact Us</h2>
        <p style={descriptionStyle}>Have a question or want to book a rental? Get in touch with us!</p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="name" style={labelStyle}>Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required style={inputStyle} />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={labelStyle}>Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required style={inputStyle} />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="phone" style={labelStyle}>Phone Number</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="rentalType" style={labelStyle}>Rental Type</label>
            <select id="rentalType" name="rentalType" value={formData.rentalType} onChange={handleChange} required style={inputStyle}>
              <option value="">Select a rental type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="vacation-home">Vacation Home</option>
              <option value="commercial">Commercial Space</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="message" style={labelStyle}>Message</label>
            <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required style={{...inputStyle, resize: 'vertical'}}></textarea>
          </div>
          
          <button type="submit" style={buttonStyle}>Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
