var arrJson = [];

const Main = {
    data() {
        return {
            passWord: '',
            fileContent: '',
            fileName: '',
            cipherText: ''
        }
    },
    computed: {
        classPrefix: () => 'crypto-box'
    },
    methods: {
        upload(event) {
            let that = this;
            if (window.FileReader) {
                let file = event.target.files[0];
                this.fileName = file.name.split(".")[0];
                // this.fileName = file.name;
                let reader = new FileReader();
                reader.onload = function(evt) {
                    that.fileContent = evt.target.result;
                }
                reader.readAsText(file);
            } else {
                alert('error');
            }
        },
        decryptSave() {
            let that = this;
            if (this.passWord === '' || this.passWord === null || this.passWord.length !== 32) {
                this.$alert('请32位输入密码');
                return false;
            }
            if (this.fileContent) {
                try {
                    this.cipherText = decryptAES(this.fileContent,  this.passWord)
                } catch {
                    this.$alert('解码失败,请确认密码')
                }

                setTimeout(() => {
                    that.save(this.cipherText, `${this.fileName}.xml`, 'type: "text/xml"');
                },1000)
            } else {
                this.$message({
                    message: '请选择需要解密的文件',
                    type: 'warning'
                });
            }
        },
        encryptSave() {
            let that = this;
            if (this.passWord === '' || this.passWord === null || this.passWord.length !== 32) {
                this.$alert('请32位输入密码');
                return false;
            }
            if (this.fileContent) {
                this.cipherText = encryptAES(this.fileContent, this.passWord);
                setTimeout(() => {
                    that.save(this.cipherText, `${this.fileName}.xml`, 'text/plain');
                },1000)
            } else {
                this.$message({
                    message: '请选择需要加密的文件',
                    type: 'warning'
                });
            }
        },
        save(content, fileName, type) {

            let blob = new Blob([content], {
                type: `${type}; charset=utf-8`
            });
            saveAs(blob, fileName);
            this.passWord = '';
            this.fileName = '';
            this.$refs.UploadFile.value =''
        },

    }
}
