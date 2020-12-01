module.exports = (client) => {
  console.log(`Login ke: ${client.user.tag}`);
/*  
  let asw = client.moderator
  let ab = asw.map(x => client.users.cache.get(x).tag.toString())
  
  let bl = client.blacklist
  let black = bl.map(x => client.users.cache.get(x).tag)
  
  let st = client.staff
  let staff = st.map(x => client.users.cache.get(x).tag)
  
  console.log("Staff: " + staff)
  console.log("Moderator: " + ab)//client.moderator)
  console.log("User banned: " + black)//client.blacklist)
 */ client.user.setActivity(`t!help | Beath`, { type: "WATCHING"})
}
