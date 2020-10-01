db.createUser({
  user: 'chatty',
  pwd: 'chatty2020',
  roles: [
    {
      role: 'readWrite',
      db: 'chatty',
    },
  ],
})
