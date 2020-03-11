import Vue from 'vue';
import Skeleton from '@/components/Skeleton/skeleton-2';

export default new Vue({
  components: {
    Skeleton,
  },
  render: h => h(Skeleton),
});