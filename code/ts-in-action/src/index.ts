import './enums'

const hello: string = 'Hello TypeScript'

const el = document.getElementById('app') as HTMLDivElement
el.innerText = hello
