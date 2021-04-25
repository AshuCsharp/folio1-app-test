
export const getClassList = async () =>{
    try {
        const response = await fetch('http://localhost:55217/api/folioclasses');
        const result = await response.json();    
        return result;      
        
    } catch (error) {
        
        console.log(error);
    }
}

export const getStudentList = async () =>{
    try {
        const response = await fetch('http://localhost:55217/api/Students');
        const result = await response.json();
        return result;
               
    }catch (error) {      
        console.log(error);
    }
}

