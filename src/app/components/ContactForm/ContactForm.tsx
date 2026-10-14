'use client';

import React, { useEffect, useRef, useState } from 'react';

import styles from './ContactForm.module.css';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

// Keep in sync with the limits in src/app/api/contact/route.ts.
const NAME_MAX = 100;
const EMAIL_MAX = 254;
const MESSAGE_MAX = 5000;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  // Honeypot: hidden from people, bots tend to fill it in.
  const [company, setCompany] = useState('');

  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  // When the form mounted; the server rejects suspiciously fast submits.
  const startedAtRef = useRef(0);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
    return () => {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Reset the heading back to idle after 5 seconds
  const scheduleReset = () => {
    resetTimeoutRef.current = setTimeout(() => {
      setFormStatus('idle');
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formStatus === 'submitting') return;

    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    setFormStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          company,
          startedAt: startedAtRef.current,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setFormStatus('success');

      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      scheduleReset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
      scheduleReset();
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
        return 'error, please try again';
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

  const isSubmitting = formStatus === 'submitting';

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formContent}>
          <h3 className={getHeadingClass()} role="status" aria-live="polite">
            {getHeadingText()}
          </h3>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.srOnly}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.formInput}
              required
              maxLength={NAME_MAX}
              autoComplete="name"
              placeholder="name"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.srOnly}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.formInput}
              required
              maxLength={EMAIL_MAX}
              autoComplete="email"
              placeholder="email"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.srOnly}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={styles.formTextarea}
              rows={5}
              required
              maxLength={MESSAGE_MAX}
              placeholder="message"
            />
          </div>
          {/* Honeypot, visually hidden and skipped by keyboard / AT */}
          <div className={styles.srOnly} aria-hidden="true">
            <input
              type="text"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button
            type="submit"
            className={styles.formButton}
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
