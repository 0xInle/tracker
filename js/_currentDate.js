export function currentDate() {
  let dateTimeInput = document.getElementById('date')
  let date = new Date()

  let day = String(date.getDate()).padStart(2, '0')
  let month = String(date.getMonth() + 1).padStart(2, '0')
  let year = String(date.getFullYear())
  let hours = String(date.getHours()).padStart(2, '0')
  let minutes = String(date.getMinutes()).padStart(2, '0')

  let formatDate = `${year}-${month}-${day}T${hours}:${minutes}`;

  dateTimeInput.value = formatDate;
}
