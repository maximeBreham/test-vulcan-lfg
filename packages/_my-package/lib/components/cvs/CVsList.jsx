import React, { PropTypes, Component } from 'react'
import { registerComponent, Components, useSingle2, useCurrentUser, useMulti2 } from 'meteor/vulcan:core'
import Cvs from '../../modules/cvs/collection'
import Users from 'meteor/vulcan:users'
import { Helmet } from 'react-helmet'

const CVsList = () => {
  const { currentUser } = useCurrentUser()

  const { results, loading, data } = useMulti2({
    collection: Cvs,
    fragmentName: 'cvFragment',
  })

  return (
    <div className='container'>
      <Helmet>
        <link
          name='bootstrap'
          rel='stylesheet'
          type='text/css'
          href='https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css'
        />
      </Helmet>
      {currentUser && <div>Bonjour {currentUser.username}</div>}

      <Components.AccountsLoginForm />
      <div className='cvs mt-5 mb-2'>
        <Components.Datatable
          collection={Cvs}
          columns={['name', 'year', 'skills']}
          emptyState={<p className='datatable-empty'>Pa de cvs disponibles</p>}
          options={{ fragmentName: 'cvFragment' }}
        />
      </div>
    </div>
  )
}

registerComponent({ name: 'CVsList', component: CVsList })
