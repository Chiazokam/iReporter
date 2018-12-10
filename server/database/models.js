const dropDB = `
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS incidents CASCADE;
        `;

const createTables = `
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username TEXT UNIQUE NOT NULL,
            firstname TEXT NOT NULL,
            lastname TEXT NOT NULL,
            othername TEXT,
            email TEXT UNIQUE NOT NULL,
            profileImage TEXT,
            password TEXT NOT NULL,
            phoneNumber TEXT UNIQUE NOT NULL,
            isAdmin BOOLEAN,
            registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );

        CREATE TABLE IF NOT EXISTS incidents(
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            comment TEXT NOT NULL,
            type TEXT NOT NULL,
            location TEXT NOT NULL,
            status TEXT NOT NULL,
            images TEXT[],
            videos TEXT[],
            createdBy INT REFERENCES users(id),
            createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
          `;

const addAdmin = `
        INSERT INTO users(
          username,
          firstname,
          lastname,
          othername,
          email,
          phoneNumber,
          password,
          isAdmin,
          profileimage)
        VALUES (
          'shaolinmkz',
          'Chukwuemeka',
          'Nwabuzor',
          'Obiora',
          'nwabuzor.obiora@gmail.com',
          '07067443245',
          '$2a$10$TRKGYcUtvqxaBFuBWZlccOF559mfcAFtKrrKZw/KWA507nTioM6x6',
          'true',
          'https://res.cloudinary.com/shaolinmkz/image/upload/v1544370726/avatar.png');
          `;

const createIncidentRecord = `
        INSERT INTO incidents(
          title,
          comment,
          type,
          location,
          images,
          videos,
          status,
          createdBy)
          VALUES (
            'People are suffering from mal-nutrition',
            'It all started when the earth rumbled...',
            'red-flag',
            '12.233334, 2.323123',
            '{http://jamaica-star.com/sites/default/files/styles/460px/public/media/article_images/2017/11/21/BadroadsA20171121RM.jpg?itok=K72fUdU5}',
            '{https://youtu.be/bPYbg-nrWzg}',
            'draft',
            1);
              `;


export { dropDB, createTables, addAdmin, createIncidentRecord };
