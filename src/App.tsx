import React from 'react'

export const App = () => <>
	Nice. It's running, with, like, typescript and stuff.
	You can tell because prop types.
	<Child foo="bar"/>
</>

const Child = ({foo}: {foo: string}) => <>->{foo}</>
