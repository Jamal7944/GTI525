async function fetchDataPOST() {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key: 'value' }) // Remplacez par les données que vous souhaitez envoyer
      };
  
      const response = await fetch("/api", requestOptions);
  
      if (!response.ok) {
        throw new Error('Erreur réseau - ' + response.statusText);
      }
  
      const data = await response.json();
      console.log(data.message); 
  
    } catch (error) {
      console.error('Erreur lors de la requête POST :', error);
    }
  }
  async function fetchDataGET() {
    try {
      const response = await fetch("/api");
  
      if (!response.ok) {
        throw new Error('Erreur réseau - ' + response.statusText);
      }
  
      const data = await response.json();
      console.log(data.message); 
  
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
    }
  }

  export default {
    fetchDataGET,
    fetchDataPOST
  }