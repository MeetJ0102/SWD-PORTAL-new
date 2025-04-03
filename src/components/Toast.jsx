import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
  customClass: {
    container: 'p-4 ',
    title: "font-semibold text-primary ", 
    timerProgressBar: 'h-1 bg-primary rounded-full', 
  }
});

module.exports={
    Toast
}