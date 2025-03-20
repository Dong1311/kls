import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const CustomPopup = ({ title, text, onConfirm, className, style, disabled }) => {
  const showPopup = () => {
    if (disabled) return

    MySwal.fire({
      icon: 'warning',
      text: text,
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#B8B8B8',
      customClass: {
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
      },
      didRender: () => {
        const confirmButton = document.querySelector('.custom-confirm-button')
        const cancelButton = document.querySelector('.custom-cancel-button')

        if (confirmButton) {
          confirmButton.style.width = '120px'
          confirmButton.style.padding = '10px 20px'
          confirmButton.style.fontSize = '16px'
        }

        if (cancelButton) {
          cancelButton.style.width = '100px'
          cancelButton.style.padding = '10px 20px'
          cancelButton.style.fontSize = '16px'
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm()
      }
    })
  }

  return (
    <button className={className} style={style} onClick={showPopup} disabled={disabled}>
      {title}
    </button>
  )
}

export default CustomPopup
