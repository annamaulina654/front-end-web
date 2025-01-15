function fibonacci(n) {
    if (n === 0) {
      return [0];
    } else if (n === 1) {
      return [0, 1];
    }
  
    const angka = fibonacci(n - 1);
  
    angka.push(angka[n - 1] + angka[n - 2]);
    return angka;
  }

// Jangan hapus kode di bawah ini!
export default fibonacci;
