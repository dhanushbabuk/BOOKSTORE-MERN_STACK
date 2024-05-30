// Function to display success alert
const showSuccessAlertForAdding = () => {
  Swal.fire({
    title: "Success!",
    text: "Book added successfully",
    icon: "success",
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/books";
    }
  });
};

// Function to display error alert
const showErrorAlertForAdding = (message) => {
  Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    confirmButtonText: "OK",
  });
};
// Function to display success alert after updating or deleting a book
const showSuccessAlertForUpdating = () => {
  Swal.fire({
    title: "Success!",
    text: "Book updated successfully",
    icon: "success",
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/books`;
    }
  });
};

// Function to display error alert after encountering an error while updating or deleting a book
const showErrorAlertForUpdating = (message) => {
  Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    confirmButtonText: "OK",
  });
};

const showSuccessAlertForDeleting = () => {
  Swal.fire({
    title: "Success!",
    text: "Book Deleted successfully",
    icon: "success",
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/books";
    }
  });
};

// Function to display error alert
const showErrorAlertFordeleting = (message) => {
  Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    confirmButtonText: "OK",
  });
};
