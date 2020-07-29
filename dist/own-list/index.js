import componentBehaviors from '../components-behavior.js';
Component({
  behaviors: [componentBehaviors],
  options: {
    multipleSlots: true
  },
  externalClasses:['own-list-class','own-header-class'],
  properties: {
    header: {
      type: Boolean,
      value: false
    }
  },
  data: {

  },
  methods: {

  }
})