interface HasProperties {
  name: string
  isOk: boolean
}

interface HasPropertiesAndMaybeExtrasToo {
  colour: string
  happiness: number
  [key: string]: string | number | boolean
}

interface Whatever {
  [key: string]: any
}

const billy: HasProperties = { name: 'Billy', isOk: true }

const sigly: HasPropertiesAndMaybeExtrasToo = { colour: 'red', happiness: 10, also: true }

function acceptWhatever(whatever: Whatever): void {
  console.log(whatever)
}

acceptWhatever(billy)
acceptWhatever(sigly)
