
export const getClassList = async () => {
    try {
        //http://localhost:55217/api/folioclasses don't forget to add item1
        //https://6079395e460a6600174fb472.mockapi.io/api/v1/folioclasses don't forget to remove item1
        const response = await fetch('https://6079395e460a6600174fb472.mockapi.io/api/v1/folioclasses');
        const result = await response.json();
        return result;

    } catch (error) {

        console.log(error);
    }
}

export const getStudentList = async () => {
    try {
        //http://localhost:55217/api/Students  don't forget to add item1
        //https://6079395e460a6600174fb472.mockapi.io/api/v1/Students don't forget to remove item1
       
        const response = await fetch('https://6079395e460a6600174fb472.mockapi.io/api/v1/Students');
        const result = await response.json();
        return result;

    } catch (error) {
        console.log(error);
    }
}

export const saveStudent = async (requestOptions) => {
    try {
        const response = await fetch('https://6079395e460a6600174fb472.mockapi.io/api/v1/Students', requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const editStudent = async (requestOptions, id) => {
    try {
        const response = await fetch('https://6079395e460a6600174fb472.mockapi.io/api/v1/Students/' + id,)
        const result = await response.json();
        return result;

    } catch (error) {
        console.log(error);
    }
}



