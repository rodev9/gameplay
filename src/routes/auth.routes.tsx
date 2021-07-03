import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { SignIn } from '../screens/SignIn'
import { Home } from '../screens/Home'
import { AppointmentDetails } from '../screens/AppointmentDetails'
import { CreateAppointment } from '../screens/CreateAppointment'

const { Navigator, Screen } = createStackNavigator()

export function AuthRoutes() {
  return (
    <Navigator headerMode="none">
      <Screen name="SignIn" component={SignIn} />
      <Screen name="Home" component={Home} />
      <Screen name="Appointment" component={AppointmentDetails} />
      <Screen name="CreateAppointment" component={CreateAppointment} />
    </Navigator>
  )
}
