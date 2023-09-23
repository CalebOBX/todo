var getTodos = function() {
  $.ajax({
    type: 'GET',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=319',
    dataType: 'json',
    success: function (response, textStatus) {
      $('.list-group').empty();
      response.tasks.forEach(function (task) {
        $('.list-group').append(
          "<li class='list-group-item'>" +
          "<input class='mark-complete' type='checkbox' value='' id='formCheckBox' data-id='" + task.id + "'" + (task.completed ? "checked" : "") + ">" +
          "<label class='todo-label' for='formCheckBox'>" +
            task.content +
          "</label>" +
          "<button class='btn delete' data-id='" + task.id + "'>" +
            "<i class='fas fa-trash'></i>" +
          "</button>" +
        "</li>"
        )
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var newTodo = function() {
  $.ajax({
    type: 'POST',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=319',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: $('.what-do').val()
      }
    }),
    success: function (response, textStatus) {
      $('.what-do').val('What was I going to do?');
      getTodos();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var removeTodo = function(id) {
  $.ajax({
    type: 'DELETE',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=319',
    success: function (response, textStatus) {
      getTodos();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var markCompleted = function (id) {
  $.ajax({
    type: 'PUT',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=319',
    dataType: 'json',
    success: function (response, textStatus) {
      getTodos();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
   });
}

var markActive = function (id) {
  $.ajax({
    type: 'PUT',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=319',
    dataType: 'json',
    success: function (response, textStatus) {
      getTodos();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

$(document).ready(function() {
  getTodos();
  $('#todo-item').on('submit', function(event) {
    event.preventDefault();
    newTodo();
  });
  $(document).on('click', '.delete', function() {
    removeTodo($(this).data('id'));
  });
  $(document).on('change', '.mark-complete', function() {
    if (this.checked) {
      markCompleted($(this).data('id'));
    }
    else {
      markActive($(this).data('id'));
    }
  })
});