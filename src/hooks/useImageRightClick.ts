if (typeof window !== 'undefined') {
  document.addEventListener('contextmenu', (event) => {
    if (event?.target?.nodeName === 'IMG') {
      event.preventDefault();
    }
  });
}

export default {};
