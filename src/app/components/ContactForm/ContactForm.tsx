'use client';

import React, { useState } from 'react';

import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Add a new state to track form status
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Set status to submitting
    setFormStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);

      // Set status to success
      setFormStatus('success');

      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      // Reset heading after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);

      // Set status to error
      setFormStatus('error');

      // Reset heading after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }
  };

  // Function to get the heading text based on form status
  const getHeadingText = () => {
    switch (formStatus) {
      case 'submitting':
        return 'sending...';
      case 'success':
        return 'thank you!';
      case 'error':
        return 'ERROR';
      default:
        return 'CONTACT US';
    }
  };

  // Function to get heading class based on form status
  const getHeadingClass = () => {
    switch (formStatus) {
      case 'submitting':
        return styles.headingSubmitting;
      case 'success':
        return styles.headingSuccess;
      case 'error':
        return styles.headingError;
      default:
        return '';
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formContent}>
          <h3 className={getHeadingClass()}>{getHeadingText()}</h3>
          <div className={styles.formGroup}>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.formInput}
              required
              placeholder="name"
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.formInput}
              required
              placeholder="email"
            />
          </div>
          <div className={styles.formGroup}>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={styles.formTextarea}
              rows={5}
              required
              placeholder="message"
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.formButton}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
