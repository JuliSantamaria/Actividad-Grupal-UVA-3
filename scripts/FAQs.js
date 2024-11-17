document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const faqItem = button.parentElement;
  
      // Cierra otras preguntas abiertas
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
        }
      });
  
      // Alterna la clase active en el elemento actual
      faqItem.classList.toggle('active');
    });
  });