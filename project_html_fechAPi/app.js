const getData = () => {
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/todos",
    dataType: "JSON",
    success: (response) => {
      let _html = ``;
      response.forEach((element, index) => {
        _html += `<tr>
        <td>${index + 1}</td>
        <td>${element.task}</td>
            <td>${element.completed ? "Đã hoàn thành" : "Chưa hoàn thành"}</td> 
            <td>
            <button class="btn btn-success" onclick="editTodo(${
              element.id
            })"> Edit</button>
            <button class="btn btn-danger" onclick="deleteTodo(${
              element.id
            })">Delete</button>
        </td>
        
            </tr>`;
      });
      $("#todolist").html(_html);
    },
    error: (err) => {
      console.log(err);
    },
  });
};
getData();
// Show form
const showForm = () => {
  $("#form").toggle();
};

const createTodo = () => {
  let todoName = $("#todoName").val();
  let completedInput = $('input[name="completed"]:checked').val();
  let todoData = {
    task: todoName,
    completed: completedInput == "0" ? true : false,
  };
  let todoDataNew = JSON.stringify(todoData);
  $.ajax({
    method: "POST",
    url: "http://localhost:8080/todos/create",
    dataType: "JSON",
    contentType: "application/json",
    data: todoDataNew,
    success: (response) => {
      console.log(response);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Thêm mới thành công",
        showConfirmButton: false,
        timer: 1500,
      });

      $("#todoName").val("");
      $("#form").hide();
      getData();
    },
    error: (err) => {
      console.log(err);
    },
  });
// preventDefault();
};

const deleteTodo = (todoId) => {
  Swal.fire({
    title: "Bạn chắc chắn muốn xóa?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        method: "DELETE",
        url: `http://localhost:8080/todos/${todoId}`,
        success: (response) => {
          getData();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  });
};

let idEdit;

const editTodo = (todoId) => {
  idEdit = todoId;
  $.ajax({
    method: "GET",
    url: `http://localhost:8080/todos/${todoId}`,
    success: (response) => {
      // Đổ dữ liệu từ response vào form
      $("#id").val(response.id);
      $("#todoNameEdit").val(response.task);
      $(
        "input[name='completedEdit'][value='" +
          (response.completed ? "0" : "1") +
          "']"
      ).prop("checked", true);

      // Hiển thị form
      showFormEdit();
    },
    error: (err) => {
      console.log(err);
    },
  });
};
const showFormEdit = () => {
  $("#form_update").toggle();
};

const updateTodo = () => {

  // Lấy dữ liệu từ form
  let todoNameEdit = $("#todoNameEdit").val();

  let completedEditInput = $('input[name="completedEdit"]:checked').val();
  let todoDataEdit = {
    id:idEdit,
    task: todoNameEdit,
    completed: completedEditInput == "0" ? true : false,
  };

  $.ajax({
    method: "PUT",
    url: `http://localhost:8080/todos/${idEdit}`,
    dataType: "JSON",
    contentType: "application/json",
    data: JSON.stringify(todoDataEdit),
    success: (response) => {
      console.log(response);

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Cập nhật thành công",
        showConfirmButton: false,
        timer: 1500,
      });

      getData();
      $("#form_update").hide();
    },
    error: (err) => {
      console.log(err);
    },
  });
};
