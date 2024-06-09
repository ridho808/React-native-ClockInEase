import React from 'react'
import Navigation from '@navigation/Index'
import {AppProvider, useAppContext} from '@context/AppContext'

const App = () => {
  return (
    <AppProvider>
      <Navigation/>
    </AppProvider>
  )
}

export default App