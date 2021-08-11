<template>
    <div :key="task.id" v-for="task in tasks">
        <Task @toggle-reminder="$emit('toggle-reminder',task.id)"
        @delete-task="$emit('delete-task',task.id)" :task="task" />
    </div>
</template>

<script>
import Task from "./Task"

export default {
    name: 'Tasks',
    props: {
        tasks: Array
    },
    components: {
        Task,
    },
    emits: ['delete-task','toggle-reminder'],

}

</script>

<style scope>
.fas {
  color:red;
}
.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.task.reminder {
  border-left: 5px solid green;
}

.task.pending {
  border-left: 5px solid rgb(89, 0, 255);
}

.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>