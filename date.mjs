function getDate() {
    
    let today = new Date()
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let day = today.toLocaleDateString("en-US", options)
    return day
}
export default getDate

//if we pass getdate then we are not calling ,
// but when we pass getdate() then we are calling and not passing function