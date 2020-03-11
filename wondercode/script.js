// Stack of modals
let currentlyOpenModals = [];

const openModal = modalId => {
  const modal = document.getElementById(modalId);
  modal.classList.add('modal-visible');
  currentlyOpenModals.push(modal);
};

// By definition, it's always the topmost modal that will be closed first
const closeTopmostModal = () => {
  console.log("!");
  
  if (!currentlyOpenModals.length) {
    return;
  }

  const modal = currentlyOpenModals[currentlyOpenModals.length - 1];
  modal.classList.remove('modal-visible');
  currentlyOpenModals.pop();
};

const modalTriggers = document.querySelectorAll('.modal-trigger');
modalTriggers.forEach(modalTrigger => {
  modalTrigger.addEventListener('click', clickEvent => {
    const trigger = clickEvent.target;
    const modalId = trigger.getAttribute('data-modal-id');
    openModal(modalId);
  });
});

// Otherwise, clicking the content of a modal will propagate the click to the modal wrapper,
// and that will close the entire thing. That's not what we want!
document.querySelectorAll('.modal-content').forEach(modalContent => {
  modalContent.addEventListener('click', clickEvent => {
    clickEvent.stopPropagation();
  });
});

document.querySelectorAll('.modal-close').forEach(modalCloseButton => {
  modalCloseButton.addEventListener('click', () => {
    closeTopmostModal();
  });
});

const modals = document.querySelectorAll('.modal');
modals.forEach(modal => {
  modal.addEventListener('click', () => {
    closeTopmostModal();
  });
});

document.body.addEventListener('keyup', keyEvent => {
  if (keyEvent.key === 'Escape') {
    closeTopmostModal();
  }
});

$(function() {
  $('.smoothScroll').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000); // The number here represents the speed of the scroll in milliseconds
        return false;
      }
    }
  });
});

