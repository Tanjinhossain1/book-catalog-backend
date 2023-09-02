import { Order } from "@prisma/client"
import prisma from "../../../shared/prisma"
import { ENUM_USER_ROLE } from "../../../enums/user";

const insertIntoDB = async (data: any): Promise<Order> => { 
    // Create the order and get its ID
    const order = await prisma.order.create({
    data,
    });
  
    return order;
}


const getAllFromDB = async (
    verifyTokenValue: any
): Promise<Order[]> => {
    let result: Order[] = []

     if(verifyTokenValue.role === ENUM_USER_ROLE.ADMIN){
          result = await prisma.order.findMany({});
    }else {
        result = await prisma.order.findMany({
            where: {
                userId: verifyTokenValue.userId
            }
        })
    }
        
        return result
};
export  const OrderService = {
    insertIntoDB,
    getAllFromDB
}