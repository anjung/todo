<template>
<div @dblclick="$emit('toggle-reminder', task.id)" 
    :class="[ task.reminder ? 'reminder' : 'pending', 'task' ]">
<h3>{{ task.text }}
    <i @click="$emit('delete-task',task.id)" class="fas fa-times"></i>
</h3>
<p>{{ task.day}}</p>
</div>
</template>

<script>

export default {
    name: 'Task',
    props: {
        task: Object
    },
    
}
</script>
