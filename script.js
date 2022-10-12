// текущий массив студентов
let arrayStudentStorage = []

if (JSON.parse(localStorage.getItem('array')) != null) {
  
  arrayStudentStorage = JSON.parse(localStorage.getItem('array'))
  console.log(arrayStudentStorage)
}

// отредакированый массив студентов

let arrayStudent = []

// массив для поиска студентов

let arraySearch = []

if (JSON.parse(localStorage.getItem('arraySearch')) != null) {
  arraySearch = JSON.parse(localStorage.getItem('arraySearch'))
}

// объект с информацией о студенте 

let studentObj = {
  surname: '',
  name: '',
  lastname: '',
  birthDate: '',
  dateReceipt: '',
  faculty: '',
}

// объект для поиска студентов 

let studentSearch = {
  surname: '',
  name: '',
  lastname: '',
  birthDate: '',
  dateReceipt: '',
  faculty: '',
}

// создание контейнера

function createContainer() {
  const container = document.createElement('div')

  container.classList.add('container')

  container.append(createSearch().form)
  container.append(createTable())

  return container
}

// функция создания поиска студентов

let activeArray = []

function createSearch () {
  const div = document.createElement('div')
  const form = document.createElement('form')
  const inputFio = document.createElement('input')
  const inputBirthDate = document.createElement('input')
  const inputDateReceipt = document.createElement('input')
  const yearOfGraduation = document.createElement('input')
  const inputFaculty = document.createElement('input')
  const spanSearch = document.createElement('span')

  form.classList.add('form-search')
  inputFio.classList.add('form-search__input')
  inputBirthDate.classList.add('form-search__input')
  inputDateReceipt.classList.add('form-search__input')
  yearOfGraduation.classList.add('form-search__input')
  inputFaculty.classList.add('form-search__input')
  spanSearch.classList.add('span-search')

  inputFio.placeholder = 'ФИО'
  inputBirthDate.placeholder = 'Дата рождения'
  inputDateReceipt.placeholder = 'Год поступления'
  yearOfGraduation.placeholder = 'Год окончания'
  inputFaculty.placeholder = 'Факультет'

  inputBirthDate.setAttribute('type', 'date')

  form.append(createLabel(inputFio, 'ФИО').label)
  form.append(createLabel(inputBirthDate, 'Дата рождения').label)
  form.append(createLabel(inputDateReceipt, 'Год поступления').label)
  form.append(createLabel(yearOfGraduation, 'Год окончания').label)
  form.append(createLabel(inputFaculty, 'Факультет').label)
  div.append(form)

  // функция нажатия на ввод "ФИО"

  inputFio.addEventListener('input', () => {
     
    let table = document.getElementsByTagName('table')[0]
    let tbody = document.getElementsByTagName('tbody')[0]
    table.innerHTML = ''
    tbody.innerHTML = ''

    table.append(createTableThead().thead)

    activeArray = []

    arraySearch.forEach((student, i) => {

      let studentFio = student.surname.toLowerCase() + student.name.toLowerCase() + student.lastname.toLowerCase()

      let tr = createTableTr()
      

      if ((studentFio.indexOf(inputFio.value.toLowerCase().replace(/ /g,'')) == -1) && inputFio.value.toLowerCase() != '') {

        tr.append(createTableTd(''))

        tbody.append(tr)

        if (tbody.querySelectorAll('tr.display').length == 0) {
          spanSearch.setAttribute('style', 'display: block')
          spanSearch.textContent = 'Ничего не найдено :('

          tbody.append(spanSearch)
        } else {
          spanSearch.setAttribute('style', 'display: none')
          tbody.remove(spanSearch)
        }

        table.append(tbody)

      } else if (inputFio.value == '' ) {

        tr.append(createTableTd(arrayStudentStorage[i].surname, arrayStudentStorage[i].name, arrayStudentStorage[i].lastname))
        tr.append(createTableTd(arrayStudentStorage[i].birthDate))
        tr.append(createTableTd(arrayStudentStorage[i].dateReceipt))
        tr.append(createTableTd(arrayStudentStorage[i].faculty))

        tr.classList.add('display')

        spanSearch.setAttribute('style', 'display: none')

        tbody.append(tr)
        tbody.remove(spanSearch)
        table.append(tbody)
        
      } else if ((studentFio.indexOf(inputFio.value.toLowerCase().replace(/ /g,'')) >= 0) && inputFio.value.trim() != '') {

        activeArray.push(arrayStudentStorage[i]) 

        tr.append(createTableTd(arrayStudentStorage[i].surname, arrayStudentStorage[i].name, arrayStudentStorage[i].lastname))
        tr.append(createTableTd(arrayStudentStorage[i].birthDate))
        tr.append(createTableTd(arrayStudentStorage[i].dateReceipt))
        tr.append(createTableTd(arrayStudentStorage[i].faculty))

        tr.classList.add('display')

        spanSearch.setAttribute('style', 'display: none')
       
        tbody.append(tr)
        tbody.remove(spanSearch)
        table.append(tbody)

      } 

      if (tr.classList.contains('display') != true) {
        tr.setAttribute('style', 'display: none')
      }
    })
  })


  // функция нажатия на ввод "Дата рождения"

  inputBirthDate.addEventListener('input', () => {
    let table = document.getElementsByTagName('table')[0]
    let tbody = document.getElementsByTagName('tbody')[0]
    table.innerHTML = ''
    tbody.innerHTML = ''

    table.append(createTableThead().thead)

    console.log(arraySearch[0].birthDate == Date.parse(inputBirthDate.valueAsDate))

    arraySearch.forEach((student, i) => {
      let studentBirthDate = student.birthDate

      let tr = createTableTr()

      let birthDateValue = new Date(studentBirthDate)
      let birthDateValueMonth = birthDateValue.getMonth()
      let birthDateValueDate = birthDateValue.getDate()

      if (birthDateValueMonth <= 9) {
        birthDateValueMonth = `0${birthDateValueMonth + 1}`
      } else {
        birthDateValueMonth = `${birthDateValueMonth + 1}`
      }
      
      if (birthDateValueDate <= 9) {
        birthDateValueDate = `0${birthDateValue.getDate()}`
      }

      let birthDate = `${birthDateValue.getFullYear()}-${birthDateValueMonth}-${birthDateValueDate}`

      if ((birthDate.indexOf(inputBirthDate.value) >= 0) && inputBirthDate.value.trim() != '') {

        tr.append(createTableTd(arrayStudentStorage[i].surname, arrayStudentStorage[i].name, arrayStudentStorage[i].lastname))
        tr.append(createTableTd(arrayStudentStorage[i].birthDate))
        tr.append(createTableTd(arrayStudentStorage[i].dateReceipt))
        tr.append(createTableTd(arrayStudentStorage[i].faculty))

        tr.classList.add('display')

        spanSearch.setAttribute('style', 'display: none')
        tbody.remove(spanSearch)
        
        tbody.append(tr)
        table.append(tbody)
        
      } else if (inputBirthDate.value == '' ) {

        tr.append(createTableTd(arrayStudentStorage[i].surname, arrayStudentStorage[i].name, arrayStudentStorage[i].lastname))
        tr.append(createTableTd(arrayStudentStorage[i].birthDate))
        tr.append(createTableTd(arrayStudentStorage[i].dateReceipt))
        tr.append(createTableTd(arrayStudentStorage[i].faculty))

        tr.classList.add('display')

        spanSearch.setAttribute('style', 'display: none')
        tbody.remove(spanSearch)

        tbody.append(tr)
        table.append(tbody)
        
      } else if ((birthDate.indexOf(Date.parse(inputBirthDate.valueAsDate)) == -1)) {
        tr.append(createTableTd(''))

        if (tbody.querySelectorAll('tr.display').length == 0) {
          spanSearch.setAttribute('style', 'display: block')
          spanSearch.textContent = 'Ничего не найдено :('

          tbody.append(spanSearch)
        } else {
          spanSearch.setAttribute('style', 'display: none')
          tbody.remove(spanSearch)
        }

        tbody.append(tr)
        table.append(tbody)
      }

      if (tr.classList.contains('display') != true) {
        tr.setAttribute('style', 'display: none')
      }
    })
  })

  // функция нажатия на ввод "Год поступления"

  inputDateReceipt.addEventListener('input', () => {
    let table = document.getElementsByTagName('table')[0]
    let tbody = document.getElementsByTagName('tbody')[0]
    table.innerHTML = ''
    tbody.innerHTML = ''

    table.append(createTableThead().thead)

    arraySearch.forEach((student, i) => {
      let studentDateReceipt = student.dateReceipt
      console.log(studentDateReceipt)

      let tr = createTableTr()

      let dateReceiptValue = new Date(studentDateReceipt)

      console.log(dateReceiptValue.getFullYear())

      if ((dateReceiptValue.getFullYear().toString().indexOf(inputDateReceipt.value) >= 0) && inputDateReceipt.value.trim() != '') {

        tr.append(createTableTd(arrayStudentStorage[i].surname, arrayStudentStorage[i].name, arrayStudentStorage[i].lastname))
        tr.append(createTableTd(arrayStudentStorage[i].birthDate))
        tr.append(createTableTd(arrayStudentStorage[i].dateReceipt))
        tr.append(createTableTd(arrayStudentStorage[i].faculty))

        tr.classList.add('display')

        spanSearch.setAttribute('style', 'display: none')
        tbody.remove(spanSearch)
        
        tbody.append(tr)
        table.append(tbody)
        
      } else if (inputDateReceipt.value == '' ) {

        tr.append(createTableTd(arrayStudentStorage[i].surname, arrayStudentStorage[i].name, arrayStudentStorage[i].lastname))
        tr.append(createTableTd(arrayStudentStorage[i].birthDate))
        tr.append(createTableTd(arrayStudentStorage[i].dateReceipt))
        tr.append(createTableTd(arrayStudentStorage[i].faculty))

        tr.classList.add('display')

        spanSearch.setAttribute('style', 'display: none')
        tbody.remove(spanSearch)

        tbody.append(tr)
        table.append(tbody)
        
      } else if ((dateReceiptValue.getFullYear().toString().indexOf(inputDateReceipt.value) == -1)) {
        tr.append(createTableTd(''))

        if (tbody.querySelectorAll('tr.display').length == 0) {
          spanSearch.setAttribute('style', 'display: block')
          spanSearch.textContent = 'Ничего не найдено :('

          tbody.append(spanSearch)
        } else {
          spanSearch.setAttribute('style', 'display: none')
          tbody.remove(spanSearch)
        }

        tbody.append(tr)
        table.append(tbody)
      }

      if (tr.classList.contains('display') != true) {
        tr.setAttribute('style', 'display: none')
      }
    })
  })

  // функция нажатия на ввод "Год окончания"

  yearOfGraduation.addEventListener('input', () => {
    let table = document.getElementsByTagName('table')[0]
    let tbody = document.getElementsByTagName('tbody')[0]
    table.innerHTML = ''
    tbody.innerHTML = ''

    table.append(createTableThead().thead)

    arraySearch.forEach((student, i) => {
      let studentDateReceipt = student.dateReceipt + 4

      let tr = createTableTr()

      let dateReceiptValue = new Date(studentDateReceipt)

      if (((dateReceiptValue.getFullYear() + 4).toString().indexOf(yearOfGraduation.value) >= 0) && yearOfGraduation.value.trim() != '') {

        tr.append(createTableTd(arrayStudentStorage[i].surname, arrayStudentStorage[i].name, arrayStudentStorage[i].lastname))
        tr.append(createTableTd(arrayStudentStorage[i].birthDate))
        tr.append(createTableTd(arrayStudentStorage[i].dateReceipt))
        tr.append(createTableTd(arrayStudentStorage[i].faculty))

        tr.classList.add('display')

        spanSearch.setAttribute('style', 'display: none')
        tbody.remove(spanSearch)
        
        tbody.append(tr)
        table.append(tbody)
        
      } else if (yearOfGraduation.value == '' ) {

        tr.append(createTableTd(arrayStudentStorage[i].surname, arrayStudentStorage[i].name, arrayStudentStorage[i].lastname))
        tr.append(createTableTd(arrayStudentStorage[i].birthDate))
        tr.append(createTableTd(arrayStudentStorage[i].dateReceipt))
        tr.append(createTableTd(arrayStudentStorage[i].faculty))

        tr.classList.add('display')

        spanSearch.setAttribute('style', 'display: none')
        tbody.remove(spanSearch)

        tbody.append(tr)
        table.append(tbody)
        
      } else if ((dateReceiptValue.getFullYear().toString().indexOf(yearOfGraduation.value) == -1)) {
        tr.append(createTableTd(''))

        if (tbody.querySelectorAll('tr.display').length == 0) {
          spanSearch.setAttribute('style', 'display: block')
          spanSearch.textContent = 'Ничего не найдено :('

          tbody.append(spanSearch)
        } else {
          spanSearch.setAttribute('style', 'display: none')
          tbody.remove(spanSearch)
        }

        tbody.append(tr)
        table.append(tbody)
      }

      if (tr.classList.contains('display') != true) {
        tr.setAttribute('style', 'display: none')
      }
    })
  })

  // функция нажатия на ввод "Факультет"

  inputFaculty.addEventListener('input', () => {
    let table = document.getElementsByTagName('table')[0]
    let tbody = document.getElementsByTagName('tbody')[0]
    table.innerHTML = ''
    tbody.innerHTML = ''

    table.append(createTableThead().thead)

    arraySearch.forEach((student, i) => {
      let studentFaculty = student.faculty.toLowerCase()

      let tr = createTableTr()

      if ((studentFaculty.indexOf(inputFaculty.value.toLowerCase()) >= 0) && inputFaculty.value.trim() != '') {

        tr.append(createTableTd(arrayStudentStorage[i].surname, arrayStudentStorage[i].name, arrayStudentStorage[i].lastname))
        tr.append(createTableTd(arrayStudentStorage[i].birthDate))
        tr.append(createTableTd(arrayStudentStorage[i].dateReceipt))
        tr.append(createTableTd(arrayStudentStorage[i].faculty))

        tr.classList.add('display')

        spanSearch.setAttribute('style', 'display: none')
        tbody.remove(spanSearch)
        
        tbody.append(tr)
        table.append(tbody)
        
      } else if (inputFaculty.value == '' ) {

        tr.append(createTableTd(arrayStudentStorage[i].surname, arrayStudentStorage[i].name, arrayStudentStorage[i].lastname))
        tr.append(createTableTd(arrayStudentStorage[i].birthDate))
        tr.append(createTableTd(arrayStudentStorage[i].dateReceipt))
        tr.append(createTableTd(arrayStudentStorage[i].faculty))

        tr.classList.add('display')

        spanSearch.setAttribute('style', 'display: none')
        tbody.remove(spanSearch)

        tbody.append(tr)
        table.append(tbody)
        
      } else if ((studentFaculty.indexOf(inputFaculty.value.toLowerCase()) == -1)) {
        tr.append(createTableTd(''))

        if (tbody.querySelectorAll('tr.display').length == 0) {
          spanSearch.setAttribute('style', 'display: block')
          spanSearch.textContent = 'Ничего не найдено :('

          tbody.append(spanSearch)
        } else {
          spanSearch.setAttribute('style', 'display: none')
          tbody.remove(spanSearch)
        }

        tbody.append(tr)
        table.append(tbody)
      }

      if (tr.classList.contains('display') != true) {
        tr.setAttribute('style', 'display: none')
      }
    })
  })

  return {
    div,
    form,
    inputFio,
    inputBirthDate,
    inputDateReceipt,
    inputFaculty
  }
}

// создание таблицы

function createTable() {
  const table = document.createElement('table')

  table.append(createTableThead().thead)
  table.append(createTableTbody())

  return table
}

// функция нажатия на заголовок для сортировки (переиспользование)

function clickThSort(element) {
  element.childNodes[0].addEventListener('click', () => {
    elementSortFio ()
  })

  element.childNodes[1].addEventListener('click', () => {
    elementSortBirthDate ()
  })

  element.childNodes[2].addEventListener('click', () => {
    elementSortDateReceipt ()
  })

  element.childNodes[3].addEventListener('click', () => {
    elementSortFaculty ()
  })
}

// создание заголовка таблицы

function createTableThead() {
  const thead = document.createElement('thead')
  let trHead = createTableTr()
  const btnAdd = document.createElement('button')

  btnAdd.classList.add('btn-add')

  btnAdd.innerHTML = 'Добавить'

  trHead.append(createTableTh('ФИО'))
  trHead.append(createTableTh('Дата рождения'))
  trHead.append(createTableTh('Дата зачисления'))
  trHead.append(createTableTh('Факультет'))
  trHead.append(createTableTh(btnAdd))

  thead.append(trHead)

  
  clickThSort(trHead)
  
  // функция добавления новых студентов

  btnAdd.addEventListener('click', (e) => {
    e.preventDefault()

    // создание модального окна с формой добавления нового студента

    const containerModal = document.createElement('div')
    const formModal = document.createElement('form')
    const inputNameModal = document.createElement('input')
    const inputSurnameModal = document.createElement('input')
    const inputLastnameModal = document.createElement('input')
    const inputBirthDateModal = document.createElement('input')
    const inputDateReceiptModal = document.createElement('input')
    const inputFacultytModal = document.createElement('input')
    const spanForm = document.createElement('span')
    const btnCloseModal = document.createElement('button')
    const btnAddModal = document.createElement('button')

    document.body.classList.add('active')
    containerModal.classList.add('container-popup')
    formModal.classList.add('popup__form')
    btnCloseModal.classList.add('form__closed')
    spanForm.classList.add('popup__span')

    inputNameModal.placeholder = 'Имя'
    inputSurnameModal.placeholder = 'Фамилия'
    inputLastnameModal.placeholder = 'Отчество'
    inputBirthDateModal.placeholder = 'Дата рождения'
    inputDateReceiptModal.placeholder = 'Дата зачисления'
    inputFacultytModal.placeholder = 'Название факльтета'
    btnAddModal.innerHTML = 'Сохранить'
    btnCloseModal.innerHTML = 'Закрыть'


    inputBirthDateModal.setAttribute('type', 'date')
    inputDateReceiptModal.setAttribute('type', 'date')

    formModal.append(createLabel(inputSurnameModal, 'Фамилия').label)
    formModal.append(createLabel(inputNameModal, 'Имя').label)
    formModal.append(createLabel(inputLastnameModal, 'Отчество').label)
    formModal.append(createLabel(inputBirthDateModal, 'Дата рождения').label)
    formModal.append(createLabel(inputDateReceiptModal, 'Дата поступления').label)
    formModal.append(createLabel(inputFacultytModal, 'Факультет').label)
    formModal.append(spanForm)
    formModal.append(btnAddModal)
    formModal.append(btnCloseModal)
    containerModal.append(formModal)

    // функция закрытия модального окна

    btnCloseModal.addEventListener('click', (e) => {
      e.preventDefault()

      containerModal.remove(formModal)
    })

    // функция сохранения нового студента

    btnAddModal.addEventListener('click', (e) => {
      e.preventDefault()

      // алгоритм проверки заполнения информации о студенте

        // проверка фамилии

        if (inputSurnameModal.value == '') {
          spanForm.textContent = 'Строка фамилии пуста'
          return
        } else if(regExpStr(inputSurnameModal.value) == false) {
          spanForm.textContent = 'Должна использоваться только киррилица'
          return
        } else {
          studentObj.surname = inputSurnameModal.value.trim().replace(inputSurnameModal.value[0], inputSurnameModal.value[0].toUpperCase())
          studentSearch.surname = inputSurnameModal.value.trim().toLowerCase()
        }

        // проверка имени

        if (inputNameModal.value == '') {
          spanForm.textContent = 'Строка имени пуста'
          return
        } else if(regExpStr(inputNameModal.value) == false) {
          spanForm.textContent = 'Должна использоваться только киррилица'
          return
        } else {
          studentObj.name = inputNameModal.value.trim().replace(inputNameModal.value[0], inputNameModal.value[0].toUpperCase())
          studentSearch.name = inputNameModal.value.trim().toLowerCase()
        }

        // проверка отчества

        if (inputLastnameModal.value == '') {
          spanForm.textContent = 'Строка отчества пуста'
          return
        } else if(regExpStr(inputLastnameModal.value) == false) {
          spanForm.textContent = 'Должна использоваться только киррилица'
          return
        } else {
          studentObj.lastname = inputLastnameModal.value.trim().replace(inputLastnameModal.value[0], inputLastnameModal.value[0].toUpperCase())
          studentSearch.lastname = inputLastnameModal.value.trim().toLowerCase()
        }

        // проверка даты рождения 

        if (inputBirthDateModal.value == '') {
          spanForm.textContent = 'Строка даты рождения пуста'
          return
        } else if(regExpDate(inputBirthDateModal.valueAsDate, 1900) == false) {
          spanForm.textContent = 'Некорректная дата рождения ( < 1900г)'
          return
        } else {
          studentSearch.birthDate = Date.parse(inputBirthDateModal.valueAsDate)

          let date = new Date ()
          let todayDate = date.toISOString().split('T')[0]

          let birthDateStr = Math.trunc((Date.parse(todayDate) - inputBirthDateModal.valueAsDate) / 1000 / 3600 / 24 / 365)

          let birthDateStrArr = birthDateStr.toString().split('')

          if (/[0|5|6|7|8|9]$/g.test(birthDateStrArr)) {
            studentObj.birthDate = `${inputBirthDateModal.value.trim()} (${birthDateStr + ' лет'})`
          }

          if (/[1]$/g.test(birthDateStrArr)) {
            studentObj.birthDate = `${inputBirthDateModal.value.trim()} (${birthDateStr + ' год'})`
          }

          if (/[2|3|4]$/g.test(birthDateStrArr)) {
            studentObj.birthDate = `${inputBirthDateModal.value.trim()} (${birthDateStr + ' года'})`
          }
        }


        // проверка даты поступления

        if (inputDateReceiptModal.value == '') {
          spanForm.textContent = 'Строка даты поступления пуста'
          return
        } else if(regExpDate(inputDateReceiptModal.valueAsDate, 2000) == false) {
          
          spanForm.textContent = 'Некорректная дата поступления ( < 2000г)'
          return
        } else {
          studentSearch.dateReceipt = Date.parse(inputDateReceiptModal.valueAsDate)

          let date = new Date()

          let todayDate = date.toISOString().split('T')[0]

          let dateOfTraining = Math.trunc((Date.parse(todayDate) - inputDateReceiptModal.valueAsDate) / 1000 / 3600 / 24 / 365)

          let yearReceipt = inputDateReceiptModal.value.trim().toString().split('-')[0]

          if (Math.trunc((inputDateReceiptModal.valueAsDate - inputBirthDateModal.valueAsDate) / 1000 / 3600 / 24 / 365) < 16) {
            console.log('студент слишком молод')

            spanForm.textContent = 'Студент не может быть младше 16'
            return
          }
          
          if (dateOfTraining >= 4) {
            studentObj.dateReceipt = `${yearReceipt} - ${Number(yearReceipt) + 4}`  + ' (закончил)'
          } else if (dateOfTraining <= 4 && Number(inputDateReceiptModal.value.toString().split('-')[1]) > 9) {
            studentObj.dateReceipt = `${yearReceipt} - ${Number(yearReceipt) + 4}`  + ' (закончил)'
          } else {
            studentObj.dateReceipt = `${yearReceipt} - ${Number(yearReceipt) + 4} (${`${dateOfTraining + 1} курс`})`
          }
        }

        // if(regExpDate(inputDateReceiptModal.valueAsDate, 2000) != false) {
          

        // } else {
        //   return
        // }

        // проверка факультета

        if (inputFacultytModal.value == '') {
          spanForm.textContent = 'Строка факультет пуста'
          return
        } else if(regExpStr(inputFacultytModal.value) == false) {
          spanForm.textContent = 'Должна использоваться только киррилица'
          return
        } else {
          studentObj.faculty = inputFacultytModal.value.trim()
          studentSearch.faculty = inputFacultytModal.value.trim()
        }

        // if(regExpStr(inputFacultytModal.value) != false) {
        //   studentObj.faculty = inputFacultytModal.value.trim()
        //   studentSearch.faculty = inputFacultytModal.value.trim()
        // } else {
        //   return
        // }

        if (arrayStudentStorage != null) {
          arrayStudent = arrayStudentStorage
        }

        arrayStudent.push(studentObj)

        arraySearch = JSON.parse(localStorage.getItem('arraySearch'))

        if (arraySearch == null) {
          arraySearch = []
        }
        
        arraySearch.push(studentSearch)

        localStorage.setItem('array', JSON.stringify(arrayStudent))
        localStorage.setItem('arraySearch', JSON.stringify(arraySearch))

        document.body.innerHTML = ''

        for (let i = 0; i < arrayStudent.length; i++) {

          createTableTr().append(createTableTd(arrayStudent[i].surname, arrayStudent[i].name, arrayStudent[i].lastname))
          createTableTr().append(createTableTd(arrayStudent[i].birthDate))
          createTableTr().append(createTableTd(arrayStudent[i].dateReceipt))
          createTableTr().append(createTableTd(arrayStudent[i].faculty))

          createTableTbody().append(createTableTr())
          createTable().append(createTableTbody())
          createContainer().append(createTable())

        }
        document.body.append(createContainer())
    })

    document.body.append(containerModal)
  })

  // функция проверки текстовых полей

  function regExpStr (str) {
    if (/[А-Яа-я]+/g.test(str) != true) {
      return false
    } else {
      return str
    }
  }

  // функция проверки даты рождения и даты поступления (второй аргумент - минимальное число)

  function regExpDate (str, date) {
    let today = new Date()
    let todayYear = today.getFullYear()

    let dateNow = Date.parse(todayYear) - Date.parse(date)

    // проверка условия, что ввиденая дата не меньше минимального числа и не больше сегодняшнего дня

    if ((dateNow < Date.parse(todayYear) - Date.parse((str).getFullYear())) == true || Date.parse(str) > Date.parse(today) == true) {
      console.log('ошибка')
      return false
    } else {
      return str
    }
  }

  return {
    thead,
    btnAdd,
  } 
}

// создание тела таблицы

function createTableTbody() {
  const tbody = document.createElement('tbody')

  arrayStudentStorage = JSON.parse(localStorage.getItem('array'))

  // вывод данных на страницу

  if (arrayStudentStorage != null) {
    for (let i = 0; i < arrayStudentStorage.length; i++) {

      let tr = createTableTr()
  
      tr.append(createTableTd(arrayStudentStorage[i].surname, arrayStudentStorage[i].name, arrayStudentStorage[i].lastname))
      tr.append(createTableTd(arrayStudentStorage[i].birthDate))
      tr.append(createTableTd(arrayStudentStorage[i].dateReceipt))
      tr.append(createTableTd(arrayStudentStorage[i].faculty))
  
      tbody.append(tr)
    }
  }

  return tbody
}

// создание label

function createLabel (el, str) {
  let label = document.createElement('label')
  let span = document.createElement('span')

  label.classList.add('label')
  span.classList.add('label__span')

  span.innerHTML = str

  label.append(span)
  label.append(el)

  return {
    label,
    el
  }
}

// создание строки

function createTableTr() {
  let tr = document.createElement('tr')

  tr.classList.add('table__tr')

  return tr
}

// создание ячеек для таблицы

function createTableTh(el) {
  let th = document.createElement('th')
  th.append(el)

  return th
}

function createTableTd(el1, el2, el3) {
  let td = document.createElement('td')
  td.append(Array.prototype.join.call(arguments, ' '))
  return td
}

// функции для сортировки таблицы

function elementSortFio () {
  
  let tbody = document.getElementsByTagName('tbody')[0]
  tbody.innerHTML = ''

  let arraySortNumber = []
  
  arraySortNumber = JSON.parse(localStorage.getItem('arraySearch'))

  arraySortNumber.sort((first, next) => {
    if(first.surname + first.name + first.lastname < next.surname + next.name + next.lastname) return -1;
    if (first.surname + first.name + first.lastname > next.surname + next.name + next.lastname) return 1;
  })

  if (tbody.innerHTML == '') {
    
  }

  for (let i = 0; i < arraySortNumber.length; i++) {

    let date = new Date ()
    let todayDate = date.toISOString().split('T')[0]

    let birthDateStr = Math.trunc((Date.parse(todayDate) - arraySortNumber[i].birthDate) / 1000 / 3600 / 24 / 365)

    let birthDateStrArr = birthDateStr.toString().split('')
    let birthDateValue = new Date(arraySortNumber[i].birthDate)
    let birthDateValueMonth = birthDateValue.getMonth()
    let birthDateValueDate = birthDateValue.getDate()

    if (birthDateValueMonth <= 9) {
      birthDateValueMonth = `0${birthDateValueMonth + 1}`
    } else {
      birthDateValueMonth = `${birthDateValueMonth + 1}`
    }
    
    if (birthDateValueDate <= 9) {
      birthDateValueDate = `0${birthDateValue.getDate()}`
    }

    let birthDate = `${birthDateValue.getFullYear()}-${birthDateValueMonth}-${birthDateValueDate}`

    if (/[0|5|6|7|8|9]$/g.test(birthDateStrArr)) {
      arraySortNumber[i].birthDate = `${birthDate} (${birthDateStr + ' лет'})`
    }

    if (/[1]$/g.test(birthDateStrArr)) {
      arraySortNumber[i].birthDate = `${birthDate} (${birthDateStr + ' год'})`
    }

    if (/[2|3|4]$/g.test(birthDateStrArr)) {
      arraySortNumber[i].birthDate = `${birthDate} (${birthDateStr + ' года'})`
    }

    let dateOfTraining = Math.trunc((Date.parse(todayDate) - arraySortNumber[i].dateReceipt) / 1000 / 3600 / 24 / 365)

    let dateReceiptValue = new Date(arraySortNumber[i].dateReceipt)
    let dateReceiptValueMonth = dateReceiptValue.getMonth()
    let dateReceiptValueDate = dateReceiptValue.getDate()

    if (dateReceiptValueMonth <= 9) {
      dateReceiptValueMonth = `0${dateReceiptValueMonth + 1}`
    } else {
      dateReceiptValueMonth = `${dateReceiptValueMonth + 1}`
    }
    
    if (dateReceiptValueDate <= 9) {
      dateReceiptValueDate = `0${dateReceiptValueDate}`
    }

    let dateReceipt = `${dateReceiptValue.getFullYear()}-${dateReceiptValueMonth}-${dateReceiptValueDate}`

    let yearReceipt = dateReceipt.trim().toString().split('-')[0]

    if (dateOfTraining >= 4) {
      arraySortNumber[i].dateReceipt = `${yearReceipt} - ${Number(yearReceipt) + 4}`  + ' (закончил)'
    } else if (dateOfTraining <= 4 && date.getMonth() + 1 > 9) {
      arraySortNumber[i].dateReceipt = `${yearReceipt} - ${Number(yearReceipt) + 4}`  + ' (закончил)'
    } else {
      arraySortNumber[i].dateReceipt = `${yearReceipt} - ${Number(yearReceipt) + 4} (${`${dateOfTraining + 1} курс`})`
    }

    let tr = createTableTr()
    tr.append(createTableTd(arraySortNumber[i].surname.replace(arraySortNumber[i].surname[0], arraySortNumber[i].surname[0].toUpperCase()), arraySortNumber[i].name.replace(arraySortNumber[i].name[0], arraySortNumber[i].name[0].toUpperCase()), arraySortNumber[i].lastname.replace(arraySortNumber[i].lastname[0], arraySortNumber[i].lastname[0].toUpperCase())))
    tr.append(createTableTd(arraySortNumber[i].birthDate))
    tr.append(createTableTd(arraySortNumber[i].dateReceipt))
    tr.append(createTableTd(arraySortNumber[i].faculty))

    tbody.append(tr)
  }
}

function elementSortBirthDate () {
  
  let tbody = document.getElementsByTagName('tbody')[0]
  tbody.innerHTML = ''
  
  let arraySortNumber = []
  
  arraySortNumber = JSON.parse(localStorage.getItem('arraySearch'))
  
  arraySortNumber.sort((first, next) => first.birthDate - next.birthDate)

  for (let i = 0; i < arraySortNumber.length; i++) {
    let date = new Date ()
    let todayDate = date.toISOString().split('T')[0]

    let birthDateStr = Math.trunc((Date.parse(todayDate) - arraySortNumber[i].birthDate) / 1000 / 3600 / 24 / 365)

    let birthDateStrArr = birthDateStr.toString().split('')

    let birthDateValue = new Date(arraySortNumber[i].birthDate)
    let birthDateValueMonth = birthDateValue.getMonth()
    let birthDateValueDate = birthDateValue.getDate()

    if (birthDateValueMonth <= 9) {
      birthDateValueMonth = `0${birthDateValueMonth + 1}`
    } else {
      birthDateValueMonth = `${birthDateValueMonth + 1}`
    }
    
    if (birthDateValueDate <= 9) {
      birthDateValueDate = `0${birthDateValue.getDate()}`
    }

    let birthDate = `${birthDateValue.getFullYear()}-${birthDateValueMonth}-${birthDateValueDate}`

    if (/[0|5|6|7|8|9]$/g.test(birthDateStrArr)) {
      arraySortNumber[i].birthDate = `${birthDate} (${birthDateStr + ' лет'})`
    }

    if (/[1]$/g.test(birthDateStrArr)) {
      arraySortNumber[i].birthDate = `${birthDate} (${birthDateStr + ' год'})`
    }

    if (/[2|3|4]$/g.test(birthDateStrArr)) {
      arraySortNumber[i].birthDate = `${birthDate} (${birthDateStr + ' года'})`
    }


    let dateOfTraining = Math.trunc((Date.parse(todayDate) - arraySortNumber[i].dateReceipt) / 1000 / 3600 / 24 / 365)

    let dateReceiptValue = new Date(arraySortNumber[i].dateReceipt)
    let dateReceiptValueMonth = dateReceiptValue.getMonth()
    let dateReceiptValueDate = dateReceiptValue.getDate()

    if (dateReceiptValueMonth <= 9) {
      dateReceiptValueMonth = `0${dateReceiptValueMonth + 1}`
    } else {
      dateReceiptValueMonth = `${dateReceiptValueMonth + 1}`
    }
    
    if (dateReceiptValueDate <= 9) {
      dateReceiptValueDate = `0${dateReceiptValueDate}`
    }

    let dateReceipt = `${dateReceiptValue.getFullYear()}-${dateReceiptValueMonth}-${dateReceiptValueDate}`

    let yearReceipt = dateReceipt.trim().toString().split('-')[0]

    if (dateOfTraining >= 4) {
      arraySortNumber[i].dateReceipt = `${yearReceipt} - ${Number(yearReceipt) + 4}`  + ' (закончил)'
    } else if (dateOfTraining <= 4 && date.getMonth() + 1 > 9) {
      arraySortNumber[i].dateReceipt = `${yearReceipt} - ${Number(yearReceipt) + 4}`  + ' (закончил)'
    } else {
      arraySortNumber[i].dateReceipt = `${yearReceipt} - ${Number(yearReceipt) + 4} (${`${dateOfTraining + 1} курс`})`
    }

    let tr = createTableTr()

    tr.append(createTableTd(arraySortNumber[i].surname.replace(arraySortNumber[i].surname[0], arraySortNumber[i].surname[0].toUpperCase()), arraySortNumber[i].name.replace(arraySortNumber[i].name[0], arraySortNumber[i].name[0].toUpperCase()), arraySortNumber[i].lastname.replace(arraySortNumber[i].lastname[0], arraySortNumber[i].lastname[0].toUpperCase())))
    tr.append(createTableTd(arraySortNumber[i].birthDate))
    tr.append(createTableTd(arraySortNumber[i].dateReceipt))
    tr.append(createTableTd(arraySortNumber[i].faculty))

    tbody.append(tr)
  }
}

function elementSortDateReceipt () {
  
  let tbody = document.getElementsByTagName('tbody')[0]
  tbody.innerHTML = ''

  let arraySortNumber = []
  
  arraySortNumber = JSON.parse(localStorage.getItem('arraySearch'))

  arraySortNumber.sort((first, next) => first.dateReceipt - next.dateReceipt)

  for (let i = 0; i < arraySortNumber.length; i++) {
    
    let date = new Date ()
    let todayDate = date.toISOString().split('T')[0]

    let birthDateStr = Math.trunc((Date.parse(todayDate) - arraySortNumber[i].birthDate) / 1000 / 3600 / 24 / 365)

    let birthDateStrArr = birthDateStr.toString().split('')
    let birthDateValue = new Date(arraySortNumber[i].birthDate)
    let birthDateValueMonth = birthDateValue.getMonth()
    let birthDateValueDate = birthDateValue.getDate()

    if (birthDateValueMonth <= 9) {
      birthDateValueMonth = `0${birthDateValueMonth + 1}`
    } else {
      birthDateValueMonth = `${birthDateValueMonth + 1}`
    }
    
    if (birthDateValueDate <= 9) {
      birthDateValueDate = `0${birthDateValue.getDate()}`
    }

    let birthDate = `${birthDateValue.getFullYear()}-${birthDateValueMonth}-${birthDateValueDate}`

    if (/[0|5|6|7|8|9]$/g.test(birthDateStrArr)) {
      arraySortNumber[i].birthDate = `${birthDate} (${birthDateStr + ' лет'})`
    }

    if (/[1]$/g.test(birthDateStrArr)) {
      arraySortNumber[i].birthDate = `${birthDate} (${birthDateStr + ' год'})`
    }

    if (/[2|3|4]$/g.test(birthDateStrArr)) {
      arraySortNumber[i].birthDate = `${birthDate} (${birthDateStr + ' года'})`
    }
    
    let dateOfTraining = Math.trunc((Date.parse(todayDate) - arraySortNumber[i].dateReceipt) / 1000 / 3600 / 24 / 365)

    let dateReceiptValue = new Date(arraySortNumber[i].dateReceipt)
    let dateReceiptValueMonth = dateReceiptValue.getMonth()
    let dateReceiptValueDate = dateReceiptValue.getDate()

    if (dateReceiptValueMonth <= 9) {
      dateReceiptValueMonth = `0${dateReceiptValueMonth + 1}`
    } else {
      dateReceiptValueMonth = `${dateReceiptValueMonth + 1}`
    }
    
    if (dateReceiptValueDate <= 9) {
      dateReceiptValueDate = `0${dateReceiptValueDate}`
    }

    let dateReceipt = `${dateReceiptValue.getFullYear()}-${dateReceiptValueMonth}-${dateReceiptValueDate}`

    let yearReceipt = dateReceipt.trim().toString().split('-')[0]

    if (dateOfTraining >= 4) {
      arraySortNumber[i].dateReceipt = `${yearReceipt} - ${Number(yearReceipt) + 4}`  + ' (закончил)'
    } else if (dateOfTraining <= 4 && date.getMonth() + 1 > 9) {
      arraySortNumber[i].dateReceipt = `${yearReceipt} - ${Number(yearReceipt) + 4}`  + ' (закончил)'
    } else {
      arraySortNumber[i].dateReceipt = `${yearReceipt} - ${Number(yearReceipt) + 4} (${`${dateOfTraining + 1} курс`})`
    }

    let tr = createTableTr()

    tr.append(createTableTd(arraySortNumber[i].surname.replace(arraySortNumber[i].surname[0], arraySortNumber[i].surname[0].toUpperCase()), arraySortNumber[i].name.replace(arraySortNumber[i].name[0], arraySortNumber[i].name[0].toUpperCase()), arraySortNumber[i].lastname.replace(arraySortNumber[i].lastname[0], arraySortNumber[i].lastname[0].toUpperCase())))
    tr.append(createTableTd(arraySortNumber[i].birthDate))
    tr.append(createTableTd(arraySortNumber[i].dateReceipt))
    tr.append(createTableTd(arraySortNumber[i].faculty))

    tbody.append(tr)
  }
}

function elementSortFaculty () {
  
  let tbody = document.getElementsByTagName('tbody')[0]
  tbody.innerHTML = ''

  let arraySortNumber = []
  
  arraySortNumber = JSON.parse(localStorage.getItem('arraySearch'))

  arraySortNumber.sort((first, next) => {
    if(first.faculty.toLowerCase() < next.faculty.toLowerCase()) return -1;
    if (first.faculty.toLowerCase() > next.faculty.toLowerCase()) return 1;
  })

  for (let i = 0; i < arraySortNumber.length; i++) {

    let date = new Date ()
    let todayDate = date.toISOString().split('T')[0]

    let birthDateStr = Math.trunc((Date.parse(todayDate) - arraySortNumber[i].birthDate) / 1000 / 3600 / 24 / 365)

    let birthDateStrArr = birthDateStr.toString().split('')
    let birthDateValue = new Date(arraySortNumber[i].birthDate)
    let birthDateValueMonth = birthDateValue.getMonth()
    let birthDateValueDate = birthDateValue.getDate()

    if (birthDateValueMonth <= 9) {
      birthDateValueMonth = `0${birthDateValueMonth + 1}`
    } else {
      birthDateValueMonth = `${birthDateValueMonth + 1}`
    }
    
    if (birthDateValueDate <= 9) {
      birthDateValueDate = `0${birthDateValue.getDate()}`
    }

    let birthDate = `${birthDateValue.getFullYear()}-${birthDateValueMonth}-${birthDateValueDate}`

    if (/[0|5|6|7|8|9]$/g.test(birthDateStrArr)) {
      arraySortNumber[i].birthDate = `${birthDate} (${birthDateStr + ' лет'})`
    }

    if (/[1]$/g.test(birthDateStrArr)) {
      arraySortNumber[i].birthDate = `${birthDate} (${birthDateStr + ' год'})`
    }

    if (/[2|3|4]$/g.test(birthDateStrArr)) {
      arraySortNumber[i].birthDate = `${birthDate} (${birthDateStr + ' года'})`
    }

    let dateOfTraining = Math.trunc((Date.parse(todayDate) - arraySortNumber[i].dateReceipt) / 1000 / 3600 / 24 / 365)

    let dateReceiptValue = new Date(arraySortNumber[i].dateReceipt)
    let dateReceiptValueMonth = dateReceiptValue.getMonth()
    let dateReceiptValueDate = dateReceiptValue.getDate()

    if (dateReceiptValueMonth <= 9) {
      dateReceiptValueMonth = `0${dateReceiptValueMonth + 1}`
    } else {
      dateReceiptValueMonth = `${dateReceiptValueMonth + 1}`
    }
    
    if (dateReceiptValueDate <= 9) {
      dateReceiptValueDate = `0${dateReceiptValueDate}`
    }

    let dateReceipt = `${dateReceiptValue.getFullYear()}-${dateReceiptValueMonth}-${dateReceiptValueDate}`

    let yearReceipt = dateReceipt.trim().toString().split('-')[0]

    if (dateOfTraining >= 4) {
      arraySortNumber[i].dateReceipt = `${yearReceipt} - ${Number(yearReceipt) + 4}`  + ' (закончил)'
    } else if (dateOfTraining <= 4 && date.getMonth() + 1 > 9) {
      arraySortNumber[i].dateReceipt = `${yearReceipt} - ${Number(yearReceipt) + 4}`  + ' (закончил)'
    } else {
      arraySortNumber[i].dateReceipt = `${yearReceipt} - ${Number(yearReceipt) + 4} (${`${dateOfTraining + 1} курс`})`
    }

    let tr = createTableTr()
    tr.append(createTableTd(arraySortNumber[i].surname.replace(arraySortNumber[i].surname[0], arraySortNumber[i].surname[0].toUpperCase()), arraySortNumber[i].name.replace(arraySortNumber[i].name[0], arraySortNumber[i].name[0].toUpperCase()), arraySortNumber[i].lastname.replace(arraySortNumber[i].lastname[0], arraySortNumber[i].lastname[0].toUpperCase())))
    tr.append(createTableTd(arraySortNumber[i].birthDate))
    tr.append(createTableTd(arraySortNumber[i].dateReceipt))
    tr.append(createTableTd(arraySortNumber[i].faculty))

    tbody.append(tr)
  }
}


document.addEventListener('DOMContentLoaded', () => {
 
  document.body.append(createContainer())
})