<template>
 <div class="container">
  <Header title="Task Tracker" @toggle-add-task="toggleAddTask" 
    :showAddTask = "showAddTask" />
  <div v-show="showAddTask">
    <AddTask @add-task="addTask" />
  </div>
  <Tasks @toggle-reminder="toggleReminder"
      @delete-task="deleteTask" :tasks ="tasks" />
  <Footer />
  </div>
</template>

<script>

import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

export default {
  name: 'App',
  components: { 
    Header, Footer, Tasks, AddTask
  },

  data() {
    return{
      tasks: [],
      showAddTask: false
    }
  },

  methods: {

    async addTask(task) {
       // tambah yang baru
      const jwp = await fetch( 'api/tasks', {
          method: 'POST',
          headers: {
              'Content-type': 'application/json'
                  },
          body: JSON.stringify(task)
                        })
      const maklumat = await jwp.json()
      this.tasks = [ ...this.tasks, maklumat]
    },

    async deleteTask(id) {
      // console.log('Task',id)
      if(confirm("Are You Sure ?")) {
        const jwp = await fetch(`api/tasks/${id}` , {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json'
                  },   
        })
        jwp.status === 200 ? (this.tasks = this.tasks.filter( (task)=> task.id !== id) ) 
        : alert ('Error deleting task')
      }
    },

    toggleAddTask() {
      this.showAddTask = ! this.showAddTask
    },

    async toggleReminder(id) {
    //  console.log('Toggled Task',id)
        const TaskToToggle = await this.fetchTask(id)
        const updTaskReminder = { ...TaskToToggle, reminder: !TaskToToggle.reminder}
        const jwp = await fetch(`api/tasks/${id}`, {
                method: 'PUT',
                headers: {
              'Content-type': 'application/json'
                  },
                body: JSON.stringify(updTaskReminder)
                })
        const data = await jwp.json()
    this.tasks = this.tasks.map( (task)=>
    task.id === id ? { ...task, reminder: data.reminder }  : task
    )
    },

    async fetchTasks() {
     // const jwp = await fetch('http://192.168.43.38:5050/tasks')
     //
     const jwp = await fetch('api/tasks')
      
      const maklumat = await jwp.json()
      // console.log(maklumat)
      return maklumat
    },

    async fetchTask(id) {
     const jwp = await fetch(`api/tasks/${id}`)
      const maklumat = await jwp.json()
      // console.log(maklumat)
      return maklumat
    }

  },

  async created() {
        this.tasks = await this.fetchTasks()


    // hardcoded data
    // this.tasks = [
    //   {
    //     id: 1,
    //     text: 'Doctors Appointment',
    //     day: 'March 1st at 2:30pm',
    //     reminder: true,
    //   },
    //         {
    //     id: 2,
    //     text: 'Meeting at School',
    //     day: 'March 1st at 1:30pm',
    //     reminder: false,
    //   },
    //         {
    //     id: 3,
    //     text: 'Food Shopping',
    //     day: 'March 1st at 11:am',
    //     reminder: true,
    //   }

    // ]
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Poppins', sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
