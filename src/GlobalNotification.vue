<script lang="ts">
import { defineComponent } from 'vue'
import { useNotification } from 'naive-ui'

// content
export default defineComponent({
  setup() {
    window.$notification = useNotification()
  }
})
</script>
