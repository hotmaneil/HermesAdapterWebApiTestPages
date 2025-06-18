<script lang="ts">
import { useDialog } from 'naive-ui'
import { defineComponent } from 'vue'

// content
export default defineComponent({
  setup() {
    window.$dialog = useDialog()
  }
})
</script>
