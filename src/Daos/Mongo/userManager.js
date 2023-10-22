import userModel from "./models/user.model.js";

class userManagerMongo{
    constructor(){
        this.model=userModel
    }


    async getUsers(){
        try{
            return await this.model.find({})

        }catch(error){
            console.log(error)
        }
    }
    async getUser(uid){
                    return await this.model.findOne({_id: uid})
          }
    async createUser(newUser){
        return await this.model.create(newUser)

    }
    async updateUser(){}
    async deleteUser(){}
}

export default userManagerMongo