if (typeof window !== 'undefined') {
  document.addEventListener('contextmenu', (event) => {
    const evt: any = event;
    if (evt?.target?.nodeName === 'IMG') {
      event.preventDefault();
    }
  });
}

export default {};
