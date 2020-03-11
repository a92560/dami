/*
 * @Description:
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-12 23:07:21
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-13 12:54:46
 */
import Vue from 'vue'
import {
  Button,
  Form,
  Input,
  FormItem,
  Carousel,
  CarouselItem,
  DatePicker,
  Pagination,
  Dialog,
  Breadcrumb,
  BreadcrumbItem,
  Icon,
  Rate,
  Tooltip,
  CheckboxGroup,
  Checkbox,
  Radio,
  Table,
  TableColumn,
  Popover,
  RadioGroup,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Upload,
  Select,
  Option,
  Message,
  Col,
  Row,
  Autocomplete,
  Loading,
  MessageBox,
  Tag
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Icon)
Vue.use(Rate)
Vue.use(Tooltip)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Popover)
Vue.use(RadioGroup)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Upload)
Vue.use(Option)
Vue.use(Select)
Vue.use(Col)
Vue.use(Row)
Vue.use(Autocomplete)
Vue.use(Loading)
Vue.use(Tag)
Vue.component('Message', Message)
Vue.component('MessageBox', MessageBox)
Vue.prototype.$message = Message
Vue.prototype
  .$msgBox = MessageBox