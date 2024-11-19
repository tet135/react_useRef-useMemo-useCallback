import {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react'

import Page from './component/page'
import Grid from './component/grid'
import Box from './component/box'
// import PostList from './container/post-list'

//+++++++++++
//useMemo
function Child({ state }) {
  console.log('Child render')

  const handleClick = useCallback(
    () => alert(state),
    [state],
  )
  // const data = useMemo(() => {
  //   console.log('useMemo render')
  //   //!!!треба робити розрахунку, використовуючи state/props, тобто dependencies
  //   let result = 0
  //   for (let i = 0; i < 1000000000; i++) {
  //     result += i * state
  //   }
  //   return result
  // }, [state])

  // //змінна handleClick створюється при кожному re-render, в неї попадає стрілкова функція alert('click'),яка також створюється нова при кожному перерендері
  // const handleClick = () => alert('click')

  // return <div onClick={handleClick}>Child {data}</div>

  useEffect(() => {
    console.log('new handleClick')
  }, [handleClick])
  return <div onClick={handleClick}>Child</div>
}

function App() {
  //useMemo
  const [state, setState] = useState(0)

  const [state2, setState2] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setState((prev) => prev + 1)
    }, 1000)

    const id2 = setInterval(() => {
      setState2((prev) => prev + 1)
    }, 5000)

    return () => {
      clearInterval(id)
      clearInterval(id2)
    }
  }, [])

  //змінна handleClick створюється при кожному re-render, в неї попадає стрілкова функція alert('click'),яка також створюється нова при кожному перерендері
  // const handleClick = () => alert('click')
  //тому використовується useCallback для кешування цієї функції
  // const handleClick = useCallback(
  //   () => alert(state),
  //   [state2],
  // )

  //Хук посилання на DOM елемент - useRef
  //useRef
  //перший приклад: прокрутка до потрібного елемента при натисканні на кнопку
  const firstCatRef = useRef(null)
  const secondCatRef = useRef(null)
  const thirdCatRef = useRef(null)

  function handleScrollBy(ref) {
    console.log(ref)
    if (ref && ref.current) {
      const offsetTop = ref.current.offsetTop
      window.scrollBy({
        top: offsetTop,
        behavior: 'smooth',
      })
    }
  }

  //другий приклад: автоматичний фокус на певному елементі

  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef && inputRef.current)
      inputRef.current.focus()
  }, [])

  //третій приклад: зберігання в useRef минулого значення state

  const previousValueRef = useRef(null)

  const [value, setValue] = useState(0)

  useEffect(() => {
    console.log('value', value)
    console.log('previousValueRef', previousValueRef)

    previousValueRef.current = value

    console.log('previousValueRef', previousValueRef)
  }, [value])

  const handleIncrement = () => {
    setValue(value + 1)
  }

  console.log('render')

  /* //четвертий приклад: */

  const scrollPositionRef = useRef(0)

  const handleScroll = () => {
    console.log(scrollPositionRef)
    scrollPositionRef.current = window.scrollY
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  //цей  useEffect не спрацьовує ніяк, бо в dependencies можна класти state or props,
  //тобто те, що змінюється. А зміну useRef react не контролює, тому не змінює. і не буде відбуватися re-render.
  useEffect(() => {
    console.log('scrollPositionRef', scrollPositionRef)
  }, [scrollPositionRef.current])

  return (
    <Page>
      {/* <PostList /> */}

      {/* useMemo */}
      <Box>
        useMemo testing {state}
        <div>
          <Child state={state} />
        </div>
      </Box>

      {/* //+++++++++++
      //Хук посилання на DOM елемент - useRef */}
      {/* перший приклад */}
      <Grid>
        <button onClick={() => handleScrollBy(firstCatRef)}>
          Cat Tom
        </button>
        <button
          onClick={() => handleScrollBy(secondCatRef)}
        >
          Cat Mary
        </button>
        <button onClick={() => handleScrollBy(thirdCatRef)}>
          Cat Jack
        </button>
      </Grid>
      <div>
        <ul
          style={{
            display: 'grid',
            gap: '500px',
            marginBottom: '500px',
          }}
        >
          <li>
            <img
              src="https://monstra.org/g/200/300.jpeg"
              alt="Tom"
              ref={firstCatRef}
            />
            /
          </li>
          <li>
            <img
              src="https://drasler.ru/wp-content/uploads/2019/05/%D0%9A%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8-%D1%81-%D0%BA%D0%BE%D1%82%D1%8F%D1%82%D0%B0%D0%BC%D0%B8-%D0%BD%D0%B0-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD-%D1%81%D0%BA%D0%B0%D1%87%D0%B0%D1%82%D1%8C-%D0%B1%D0%B5%D1%81%D0%BF%D0%BB%D0%B0%D1%82%D0%BD%D0%BE-6.jpg"
              alt="Mary"
              width={200}
              height={200}
              ref={secondCatRef}
            />
            /
          </li>
          <li>
            <img
              src="https://monstra.org/g/200/300.jpeg"
              alt="Jack"
              ref={thirdCatRef}
            />
            /
          </li>
        </ul>
      </div>
      {/* другий приклад */}
      <Grid>
        <Box>
          <input
            ref={inputRef}
            placeholder="Введіть пошту..."
          ></input>
        </Box>
        <Box>
          <input placeholder="Введіть пароль..."></input>
        </Box>
      </Grid>
      {/* //третій приклад */}
      <Grid>
        <Box>
          <p>Value: {value}</p>
          <p>
            previousValueRef: {previousValueRef.current}
          </p>
        </Box>
        <Box>
          <button onClick={handleIncrement}>
            Increment
          </button>
        </Box>
      </Grid>
      {/* //четвертий приклад */}
      <Box>
        <button onClick={handleScroll}>
          Click to scroll
        </button>
        <p style={{ height: 10000 }}></p>
      </Box>
    </Page>
  )
}

export default App
