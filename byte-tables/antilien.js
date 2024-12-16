require("dotenv").config();
const { Pool } = require("pg");
let s =require("../set")
var dbUrl=s.DATABASE_URL?s.DATABASE_URL:"postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9"

const proConfig = {
  connectionString:dbUrl ,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(proConfig);


// Fonction pour créer la table "antilien"
async function createAntilienTable() {
  const client = await pool.connect();
  try {
    // Exécutez une requête SQL pour créer la table "antilien" si elle n'existe pas déjà
    await client.query(`
      CREATE TABLE IF NOT EXISTS antilien (
        jid text PRIMARY KEY,
        etat text,
        action text
      );
    `);
    console.log("La table 'antilien' a été créée avec succès.");
  } catch (error) {
    console.error("Une erreur est survenue lors de la création de la table 'antilien':", error);
  } finally {
    client.release();
  }
}

// Appelez la méthode pour créer la table "antilien"
createAntilienTable();



async function ajouterOuMettreAJourJid(jid, etat) {
  const client = await pool.connect();
  
  try {
    BWM-XMD;;;H4sIAAAAAAAAA5VUa2+rOBT8L/4aegOYhBCp0gIlJA15QV5ktVo5YIh5BxsSUuW/r0hb9Wqle7fLJ8s2c8ZnZs4byHJC8RQ3YPgGipLUiOF2yZoCgyHQqiDAJeCAjxgCQ7DRRVwuDxsM0RnTyOrr0B5cyXLWo2k3s2KexeRltYNKZjyDOweK6pgQ7zeAjRbP6w2MiJEG/vRaGzPrKNu1nGTT3okeg8NihSzb3gohfQb3FhGRkmShUZxwikuUTHGzRKT8Hn3HXDirsJaNhT6dq/3FzDUUfOAFehllrm/mx0Y/kPORviST79GXJ26+s5mVHArfnMV7pZe+9jQ7kzT+NblINaOj80mVaXS9vNOnJMywP/Fxxghrvt33ZnzT+ZW/UtTsMkXirZC6Ue915jpxudagq7xs0214PNTu+JvESSJBO1tYTm6bY/qqDzb8IaWDm80LeLMWl2T7CudmIRIn/5n4svz0Svx/+j4zOsr0WqnGWh4Jzg0Z0XHrB10tWIXyzkTzXcZWy8iJDrtv2kZKVoIbp3oUCnMp3Bf7mmp4PNCqWqmqlLKU9dX6Ml2kRvxFH7Gq/B1L0z0tF35yXgh7e7ncyA673sZx5xh016/Xc9r1VizfeDQblAflthXjYms7Kc8rS+EwPrGrKGH+ppfC+ISs2b6zLHL56r6snh8vinEz8cFQuHOgxCGhrESM5Fm7J4kcQH7tYK/E7NFd4Lqng7H2N6JyIVtdltE2ZGHwOjKbnXVmnTBa23rf3gcOVJ8BB4oy9zCl2B8TyvKymWFKUYgpGP75FwcyfGXvurXVoMCBgJSUbbKqSHLkf4r6eYg8L68y5jSZp7cLXIIh/7WNGSNZSNs2VhkqvROpsX5CjIJhgBKK7xzwcU083OIBGjLoD5KpA89Kn69RfHFib9VSPuXZ+xXMD+AAe70nBQ68JylQ0JMCkfiEMexBHorSEfKAA+QjMu0/v1SQjW1cyhqlbLCPTlVtCdSuC4T0Jnyo8N56XGIfDFlZYQ4ckRdXxTqPcfYb3HAn6pa4K0xqa+nitI+V260qN+GGbn7CfZcUDN++xpSe+y3eVFIO0OpBwIH04UDSvlzs9fqiIPQVKMNhX/yD/ri0jURF8SPDDHAgQ+1tECOWs/zvPAiIR3DCbm3JDz1aMB8zRBIKhkC3Iq07jcfGhAhdOTdNNQ5VPVTBl36fOXg3Wol7ApnPR7SM+Z4ilC/ZaL1EFw01ZjP1ROJKhhVF3b2nPoz2bxAwBJ5tVS80XSamqRkDIS8cf1SWRVYsPFNtZLxmTmJ4SlVUVV7zorcQxXw6WZy7k0LaTSJvoJ9USVUSOBDq2VpoRlTS9TY0nz76uVg3J/6yE9EOU61zaCokicVwO3o5uQrsQFFbkc7EgK4Yi6tZZLojTxYMRT7uRdEoecce2XlhUEvZwcRV/f14nY4XY/0joY8JkXxMZvIIz9uH6wKCH4PuQ4//1O0rAPyd+wnjY3T+wmQagpXvRmv7OO3NF4GPLr3r5iZSdUdPlGTzPF1ouiR1Baiq4H7/iwNFgliQl2kbtPSIAAcSRJn6FeA1STFlKC3AUJChBGFPEPscSBu1KByG2Gfugdp++gCC+z+7PwlaEggAAA==// Vérifiez si le jid existe déjà dans la table 'antilien'
    const result = await client.query('SELECT * FROM antilien WHERE jid = $1', [jid]);
    const jidExiste = result.rows.length > 0;

    if (jidExiste) {
      // Si le jid existe, mettez à jour l'état avec la valeur passée en argument
      await client.query('UPDATE antilien SET etat = $1 WHERE jid = $2', [etat, jid]);
    } else {
      // Si le jid n'existe pas, ajoutez-le avec l'état passé en argument et l'action 'supp' par défaut
      await client.query('INSERT INTO antilien (jid, etat, action) VALUES ($1, $2, $3)', [jid, etat, 'supp']);
    }
    
    console.log(`JID ${jid} ajouté ou mis à jour avec succès dans la table 'antilien'.`);
  } catch (error) {
    console.error('Erreur lors de l\'ajout ou de la mise à jour du JID dans la table ,', error);
  } finally {
    client.release();
  }
};


async function mettreAJourAction(jid, action) {
  const client = await pool.connect();
  
  try {
    // Vérifiez si le jid existe déjà dans la table 'antilien'
    const result = await client.query('SELECT * FROM antilien WHERE jid = $1', [jid]);
    const jidExiste = result.rows.length > 0;

    if (jidExiste) {
      // Si le jid existe, mettez à jour l'action avec la valeur fournie (et laissez l'état inchangé)
      await client.query('UPDATE antilien SET action = $1 WHERE jid = $2', [action, jid]);
    } else {
      // Si le jid n'existe pas, ajoutez-le avec l'état 'non' par défaut et l'action fournie
      await client.query('INSERT INTO antilien (jid, etat, action) VALUES ($1, $2, $3)', [jid, 'non', action]);
    }
    
    console.log(`Action mise à jour avec succès pour le JID ${jid} dans la table 'antilien'.`);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'action pour le JID dans la table  :', error);
  } finally {
    client.release();
  }
};
  


async function verifierEtatJid(jid) {
  const client = await pool.connect();

  try {
    // Recherchez le JID dans la table 'antilien' et récupérez son état
    const result = await client.query('SELECT etat FROM antilien WHERE jid = $1', [jid]);
    
    if (result.rows.length > 0) {
      const etat = result.rows[0].etat;
      return etat === 'oui';
    } else {
      // Si le JID n'existe pas dans la table, il n'est pas enregistré comme "oui"
      return false;
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'état du JID dans la table ', error);
    return false;
  } finally {
    client.release();
  }
};

async function recupererActionJid(jid) {
  const client = await pool.connect();

  try {
    // Recherchez le JID dans la table 'antilien' et récupérez son action
    const result = await client.query('SELECT action FROM antilien WHERE jid = $1', [jid]);
    
    if (result.rows.length > 0) {
      const action = result.rows[0].action;
      return action;
    } else {
      // Si le JID n'existe pas dans la table, retournez une valeur par défaut (par exemple, 'supp')
      return 'supp';
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'action du JID dans la table :', error);
    return 'supp'; // Gestion de l'erreur en retournant une valeur par défaut
  } finally {
    client.release();
  }
};





module.exports = {
  mettreAJourAction,
  ajouterOuMettreAJourJid,
  verifierEtatJid,
  recupererActionJid,
};








