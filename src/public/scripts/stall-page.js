const btnAdd = document.getElementById('btn-add')
const absCtn = document.querySelector('.absolute-ctn')
const closeBtn = document.querySelector('.cancelar')

btnAdd.addEventListener('click', () => {
    absCtn.style.display = 'flex'
})



closeBtn.addEventListener('click', () => {
    absCtn.style.display = "none"
})