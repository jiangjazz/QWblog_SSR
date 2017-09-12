import Vue from 'vue'
import {
  Button,
  Select,
  Radio,
  Checkbox,
  Form,
  Input,
  FormItem,
  Upload,
  Message,
  MessageBox,
  Option,
  OptionGroup,
  CheckboxGroup
} from 'element-ui'

Vue.use(Button)
Vue.use(Select)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Upload)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(CheckboxGroup)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
