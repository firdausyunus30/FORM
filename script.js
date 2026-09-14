const form = document.querySelector('#booking-form');
const rentalRows = [...document.querySelectorAll('#rental-rows tr')];
const grandTotal = document.querySelector('#grand-total');
const balanceDue = document.querySelector('#balance-due');
const bookingDeposit = document.querySelector('#booking-deposit');
const securityDeposit = document.querySelector('#security-deposit');

const toNumber = (value) => Number.parseFloat(value) || 0;
const money = (value) => `RM${value.toLocaleString('ms-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function updateTotals() {
  let total = 0;

  rentalRows.forEach((row) => {
    const quantity = toNumber(row.querySelector('.quantity').value);
    const unitPrice = toNumber(row.querySelector('.unit-price').value);
    const rowTotal = quantity * unitPrice;
    total += rowTotal;
    row.querySelector('.row-total').textContent = money(rowTotal);
  });

  const paid = toNumber(bookingDeposit.value) + toNumber(securityDeposit.value);
  const balance = total - paid;
  grandTotal.textContent = money(total);
  balanceDue.textContent = money(balance);
  balanceDue.classList.toggle('negative', balance < 0);
}

form.addEventListener('input', updateTotals);
updateTotals();

document.querySelector('#print-form').addEventListener('click', () => {
  updateTotals();
  window.print();
});

document.querySelector('#reset-form').addEventListener('click', () => {
  if (!window.confirm('Kosongkan semua butiran borang?')) return;
  form.reset();
  updateTotals();
});
