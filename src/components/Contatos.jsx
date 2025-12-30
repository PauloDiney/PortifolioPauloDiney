import React, { useState, useRef, useEffect } from "react";
import "./Contatos.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from '@emailjs/browser';

const Contatos = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactMethod: "email",
    emailOrPhone: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contatosRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animação do título
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, 
        {
          opacity: 0,
          y: -50,
          scale: 0.8
        },
        {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out"
        }
      );
    }

    // Animação do subtítulo
    const subtitle = document.querySelector(".contatos-subtitle");
    if (subtitle) {
      gsap.fromTo(subtitle,
        {
          opacity: 0,
          y: 30
        },
        {
          scrollTrigger: {
            trigger: subtitle,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out"
        }
      );
    }

    // Animação do formulário
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.4,
          ease: "power2.out"
        }
      );
    }

    // Animação dos campos do formulário
    const formGroups = document.querySelectorAll(".form-group");
    if (formGroups.length > 0) {
      gsap.fromTo(formGroups,
        {
          opacity: 0,
          x: -30
        },
        {
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          },
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.6,
          ease: "power2.out"
        }
      );
    }

    // Animação do botão submit
    const submitBtn = document.querySelector(".submit-btn");
    if (submitBtn) {
      gsap.fromTo(submitBtn,
        {
          opacity: 0,
          scale: 0.9
        },
        {
          scrollTrigger: {
            trigger: submitBtn,
            start: "top 90%",
            toggleActions: "play none none none"
          },
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)"
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const { name, contactMethod, emailOrPhone, message } = formData;

    if (contactMethod === "whatsapp") {
      // Enviar por WhatsApp
      const whatsappMessage = `*Nome:* ${name}%0A*Contato:* ${emailOrPhone}%0A*Mensagem:* ${message}`;
      const phoneNumber = "5518981104236"; // COLOQUE SEU NÚMERO DE WHATSAPP AQUI (com DDI e DDD)
      window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
      
      setFormData({
        name: "",
        contactMethod: "email",
        emailOrPhone: "",
        message: ""
      });
      setIsSubmitting(false);
      return;
    }

    // Enviar por Email usando EmailJS
    try {
      const templateParams = {
        from_name: name,
        from_email: emailOrPhone,
        message: message,
        to_name: "Paulo Diney",
      };

      await emailjs.send(
        'service_e8fhaso',      // Seu Service ID
        'template_02on144',     // VOCÊ PRECISA CRIAR UM TEMPLATE NO EMAILJS E COLOCAR O ID AQUI
        templateParams,
        'w1u3j5MMjRTaX4fVn'     // Sua Public Key
      );

      setSubmitStatus('success');
      setFormData({
        name: "",
        contactMethod: "email",
        emailOrPhone: "",
        message: ""
      });
      
      // Limpar mensagem de sucesso após 5 segundos
      setTimeout(() => setSubmitStatus(null), 5000);
      
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contatos" id="contact" ref={contatosRef}>
      <div className="contatos-container">
        <h2 className="contatos-title" ref={titleRef}>
          Entre em Contato
        </h2>
        <p className="contatos-subtitle">
          Preencha o formulário abaixo e escolha como prefere receber minha resposta
        </p>

        {submitStatus === 'success' && (
          <div style={{
            padding: '1rem',
            marginBottom: '1.5rem',
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            border: '2px solid rgba(34, 197, 94, 0.5)',
            borderRadius: '10px',
            color: '#22c55e',
            textAlign: 'center',
            fontFamily: 'Oswald, sans-serif',
            animation: 'fadeIn 0.3s ease'
          }}>
            ✅ Mensagem enviada com sucesso! Responderei em breve.
          </div>
        )}

        {submitStatus === 'error' && (
          <div style={{
            padding: '1rem',
            marginBottom: '1.5rem',
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            border: '2px solid rgba(239, 68, 68, 0.5)',
            borderRadius: '10px',
            color: '#ef4444',
            textAlign: 'center',
            fontFamily: 'Oswald, sans-serif',
            animation: 'fadeIn 0.3s ease'
          }}>
            ❌ Erro ao enviar mensagem. Tente novamente.
          </div>
        )}

        <form className="contatos-form" ref={formRef} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group contact-method-group">
            <label>Prefiro ser contatado por:</label>
            <div className="radio-group">
              <label className={`radio-label ${formData.contactMethod === 'email' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="contactMethod"
                  value="email"
                  checked={formData.contactMethod === "email"}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <span className="radio-icon">📧</span>
                <span className="radio-text">Email</span>
              </label>
              
              <label className={`radio-label ${formData.contactMethod === 'whatsapp' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="contactMethod"
                  value="whatsapp"
                  checked={formData.contactMethod === "whatsapp"}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <span className="radio-icon">📱</span>
                <span className="radio-text">WhatsApp</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="emailOrPhone">
              {formData.contactMethod === "email" ? "Seu Email" : "Seu Telefone"}
            </label>
            <input
              type={formData.contactMethod === "email" ? "email" : "tel"}
              id="emailOrPhone"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              placeholder={formData.contactMethod === "email" ? "seu@email.com" : "(11) 99999-9999"}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Mensagem</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Escreva sua mensagem aqui..."
              rows="6"
              required
              disabled={isSubmitting}
            ></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            <span className="btn-text">
              {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
            </span>
            <span className="btn-icon">
              {isSubmitting ? '⏳' : (formData.contactMethod === "email" ? "✉️" : "💬")}
            </span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contatos;
