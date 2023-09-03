import { Order } from "@prisma/client"
import prisma from "../../../shared/prisma"
import { ENUM_USER_ROLE } from "../../../enums/user";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

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

    if (verifyTokenValue.role === ENUM_USER_ROLE.ADMIN) {
        result = await prisma.order.findMany({});
    } else {
        result = await prisma.order.findMany({
            where: {
                userId: verifyTokenValue.userId
            }
        })
    }

    return result
};

const getOneFromDB = async (
    id: string,
    verifyTokenValue: any
): Promise<Order[]> => {
    let result: Order[] = []

    if (verifyTokenValue.role === ENUM_USER_ROLE.ADMIN) {
        result = await prisma.order.findMany({ where: { id } });
    } else {
        result = await prisma.order.findMany({
            where: {
                userId: verifyTokenValue.userId,
                id: id
            }
        })
    }
    if (result && !result[0]) {
        throw new ApiError(httpStatus.BAD_REQUEST, "This Order is Not your")
    }
    return result
};
export const OrderService = {
    insertIntoDB,
    getAllFromDB,
    getOneFromDB
}