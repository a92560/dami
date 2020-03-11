<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-07 11:50:48
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 10:18:57
 -->
<template>
	<div class="personal-wrapper">
		<MTabs :tabs="tabs" @handleSwitchTab="handleSwitchTab"></MTabs>
		<!-- <ul class="tabs">
      <li 
        :class="[{'active': activeIndex === i}, 'tab', 'tc'] " 
        v-for="(tab, i) in tabs" 
        :key="i"
        @click="handleSwitchTab(i)"
        >{{tab}}
      </li>
    </ul> -->
		<div class="content">
			<p class="tip" v-show="activeIndex === 0">
				完善更多个人信息，有助于我们为您提供更加个性化的服务，大觅网将尊重并保护您的隐私。
			</p>
			<el-form
				:model="personForm"
				label-position="left"
				:label-width="labelWidth"
				:rules="personFormRules"
				:inline-message="true"
				ref="personForm"
				v-show="activeIndex === 0"
			>
				<el-form-item prop="nickName" :label-width="labelWidth" label="昵称">
					<el-input
						:disabled="true"
						placeholder="请输入昵称"
						v-model="personForm.nickName"
					/>
				</el-form-item>
				<el-form-item prop="phone" :label-width="labelWidth" label="手机号">
					<el-input placeholder="请输入手机号" v-model="personForm.phone" />
				</el-form-item>
				<el-form-item
					prop="realName"
					:label-width="labelWidth"
					label="真实姓名"
				>
					<el-input
						placeholder="请输入真实姓名"
						v-model="personForm.realName"
					/>
				</el-form-item>
				<el-form-item prop="cardId" :label-width="labelWidth" label="身份证号">
					<el-input placeholder="请输入身份证号" v-model="personForm.cardId" />
				</el-form-item>
				<el-form-item prop="birthday" :label-width="labelWidth" label="生日">
					<el-date-picker
						v-model="personForm.birthday"
						type="date"
						@change="handleBirthdayChange"
						placeholder="请选择日期"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item prop="sex" :label-width="labelWidth" label="性别">
					<el-radio-group v-model="personForm.sex" @change="handleSexChange">
						<el-radio label="0">男</el-radio>
						<el-radio label="1" style="margin-left:15px">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item :label-width="labelWidth">
					<button class="save-btn" @click.prevent="handleToSave">保存</button>
				</el-form-item>
			</el-form>
			<!-- 头像开始 -->
			<div class="upload-wrapper" v-show="activeIndex === 1">
				<img class="img-box" :src="avatarUrl" alt="你的头像" />
				<el-upload
					class="upload-demo"
					ref="upload"
					:action="imgUploadAddress"
					:on-success="handleUploadSuccess"
					:on-change="handleUploadChange"
					accept="image/png,image/jpg,image/jpeg"
					:show-file-list="false"
					:auto-upload="false"
				>
					<el-button slot="trigger" size="small" type="primary"
						>选取文件</el-button
					>
					<el-button
						style="margin-left: 10px;"
						size="small"
						type="success"
						@click="handleUpLoadAvatar"
						>保存</el-button
					>
					<div slot="tip" class="el-upload__tip">
						只能上传jpg/png文件，且不超过500kb
					</div>
				</el-upload>
			</div>

			<!-- 头像结束 -->
		</div>
	</div>
</template>
<script>
import axios from 'axios'
import MTabs from '@/components/tabs'
import {
	personalTabs,
	IMG_BASE_URL,
	IMG_UPLOAD_ADDRESS,
	TOKEN_KEY,
} from '@/config'
export default {
	name: 'Personal',
	components: {
		MTabs,
	},
	data() {
		return {
			tabs: personalTabs,
			activeIndex: 0,
			personForm: {
				nickName: '',
				phone: '',
				realName: '',
				cardId: '',
				sex: '0',
				birthday: '',
			},
			labelWidth: '100px',
			personFormRules: {
				nickName: [
					{
						required: true,
						message: '昵称为必填项',
						trigger: 'blur',
					},
				],
				phone: [
					{
						required: true,
						message: '手机为必填项',
						trigger: 'blur',
					},
				],
			},
			avatarUrl: IMG_BASE_URL + '',
			imgUploadAddress: IMG_UPLOAD_ADDRESS,
			rawFile: null,
			personFormString: '',
		}
	},
	methods: {
		handleSwitchTab(i) {
			this.activeIndex = i
		},
		handleBirthdayChange(value) {
			this.personForm.birthday = value
			console.log('value:::::', value)
		},
		handleSexChange(value) {
			this.personForm.sex = value
		},
		// 判断是否修改过，减轻服务器压力
		isUpdated(oldStr, newStr) {
			return oldStr.indexOf(newStr) === -1
		},
		// 处理保存修改过的数据
		handleToSave() {
			this.$refs['personForm'].validate(async (isValidated, rules) => {
				if (isValidated) {
					const {
						nickName,
						phone,
						realName,
						cardId,
						birthday,
						sex,
					} = this.personForm
					let isUpdatedNickName = this.isUpdated(
						this.personFormString,
						nickName
					)
					let isUpdatedPhone = this.isUpdated(this.personFormString, phone)
					let isUpdatedRealName = this.isUpdated(
						this.personFormString,
						realName
					)
					let isUpdatedCardId = this.isUpdated(this.personFormString, cardId)
					let isUpdatedBirthday = this.isUpdated(
						this.personFormString,
						birthday
					)
					let isUpdatedSex = this.isUpdated(this.personFormString, sex)
					let updateFlag =
						isUpdatedNickName ||
						isUpdatedPhone ||
						isUpdatedRealName ||
						isUpdatedCardId ||
						isUpdatedBirthday ||
						isUpdatedSex
					// 有一个修改即可提交
					if (updateFlag) {
						const ret = await this.$http.putUserDetail({
							nickName,
							phone,
							realName,
							cardId,
							birthday,
							sex,
						})
						console.log('ret', ret)
						if (ret) {
							this.$message.success('修改成功')
						}
					} else {
						this.$message.error('请先修改再做保存')
						console.log('不可以')
					}
				} else {
					console.log('校验不通过')
				}
			})
		},

		async handleUpLoadAvatar() {
			console.log('upload')
			let formData = new FormData()
			formData.append('file', this.rawFile)
			console.log(formData)
			const ret = await this.$http.postUserAvatar(formData)
			if (ret) {
        this.avatarUrl = IMG_BASE_URL + ret.data.url
        this.$message.success("更新头像成功")
			}
			// this.$refs.upload.submit();
		},
		// 上传成功
		handleUploadSuccess() {},
		// 上传改变
		async handleUploadChange(file, fileList) {
			this.rawFile = file.raw
			const base64 = await this.getBase64(this.rawFile)
			this.avatarUrl = base64
			console.log('handleUploadChange ::: file ::::: fileList', file, fileList)
		},
		getBase64(file) {
			return new Promise((resolve, reject) => {
				const reader = new FileReader()
				reader.readAsDataURL(file)
				reader.onload = () => resolve(reader.result)
				reader.onerror = error => reject(error)
			})
		},

		async getUserData() {
			const ret = await this.$http.getUserData()
			if (ret) {
				this.personForm = ret.data.map(item => {
					this.avatarUrl = IMG_BASE_URL + item.avatarUrl
					// 比对有没有修改过
					this.personFormString = JSON.stringify({
						nickName: item.email,
						phone: item.phone,
						realName: item.realName,
						cardId: item.cardId,
						sex: item.sex,
						birthday: item.birthday,
					})
					console.log('this.personFormString', this.personFormString)
					return {
						nickName: item.email,
						phone: item.phone,
						realName: item.realName,
						cardId: item.cardId,
						sex: item.sex,
						birthday: item.birthday,
					}
				})[0]
				// console.log("ret", ret)
			}
		},
	},
	computed: {},
	mounted() {
		this.getUserData()
	},
}
</script>
<style lang="less" scoped>
.el-input {
	width: 60%;
}
.el-form-item {
	margin-bottom: 15px;
}
.el-form {
	padding: 30px;
}
/* ul.tabs{
  width: 100%;
  height: 31px;
  line-height: 31px;
  >li.tab{
    box-sizing: border-box;
    width: 85px;
    height: 31px;
    float: left;
    background: #f8f8f9;
    border: 1px solid #ccc;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    margin-right: 5px;
    position: relative;
    top: 1px;
    cursor: pointer;
    &.active{
      border-bottom: none;
      background: #fff;
    }
  }
} */
.content {
	border: 1px solid #ccc;
	height: 600px;
	border-right: none;
	.tip {
		background: #fffdee;
		border: 1px solid #edd28b;
		padding: 10px 20px;
		color: #999;
		margin: 10px 20px;
	}
	.save-btn {
		outline: none;
		border: none;
		background: @HoverC;
		color: white;
		cursor: pointer;
		padding: 5px 14px;
		border-radius: 4px;
	}
}
.upload-wrapper {
	padding: 20px;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	.upload-demo {
		text-align: center;
	}
	.img-box {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin-bottom: 20px;
		> img {
			height: 100%;
			width: 100%;
		}
	}
}
</style>