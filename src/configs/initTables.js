const pool=require('../services/db');
const SQLSTATEMENT=`
        DROP TABLE IF EXISTS Equipped_item;
        DROP TABLE IF EXISTS Quest_completed;
        DROP TABLE IF EXISTS Inventory; 
        DROP TABLE IF EXISTS Character_progression;
        DROP TABLE IF EXISTS Item;
        DROP TABLE IF EXISTS Message;
        DROP TABLE IF EXISTS Quest;
        CREATE TABLE Message(
            message_id INT PRIMARY KEY AUTO_INCREMENT,
            message TEXT,
            character_id INT NOT NULL,
            created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE Item(
            item_id INT PRIMARY KEY AUTO_INCREMENT,
            item_name TEXT NOT NULL,
            item_type TEXT NOT NULL,
            rarity TEXT NOT NULL,
            special_effect_ability TEXT,
            special_effect_health INT,
            special_effect_attackDmg INT,
            description TEXT
        );
        CREATE TABLE Character_progression (
          character_id INT PRIMARY KEY AUTO_INCREMENT,
          character_name TEXT NOT NULL,
          email TEXT,
          password TEXT,
          level INT NOT NULL DEFAULT 1,
          gold INT NOT NULL DEFAULT 10,
          hp INT NOT NULL DEFAULT 50,
          dmg INT NOT NULL DEFAULT 5,   
          created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
         );
        CREATE TABLE Quest (
          quest_id INT PRIMARY KEY AUTO_INCREMENT,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          reward_level INT,
          reward_item TEXT,
          reward_itemId INT,
          reward_gold INT,
          creature_name TEXT NOT NULL,
          creature_hp INT NOT NULL,
          creature_dmg INT NOT NULL,
          difficulty TEXT NOT NULL,
          level_requirement INT NOT NULL DEFAULT 0
         );
        CREATE TABLE Inventory(
            id INT PRIMARY KEY AUTO_INCREMENT,
            character_id INT NOT NULL,
            item_id INT NOT NULL,
            received_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
         );
        CREATE TABLE Equipped_item(
            id INT PRIMARY KEY AUTO_INCREMENT,
            character_id INT NOT NULL,
            item_id INT NOT NULL
        );
        CREATE TABLE Quest_completed(
            id INT PRIMARY KEY AUTO_INCREMENT,
            character_id INT NOT NULL,
            quest_id INT NOT NULL,
            completed_on TIMESTAMP
        );        
        INSERT INTO Item (item_name, item_type, rarity, special_effect_ability, special_effect_health, special_effect_attackDmg, description)
        VALUES
        ("Normal Sword","Weapon","Common",NULL,0,20,"A starter weapon."),
        ('Dagger of Aeris', 'Weapon', 'Uncommon', "Can restore the clean air in the aura", 0, 80, 'A legendary sword known for its power over the air and restoration abilities.'),
        ('Amulet with Aqua Gem', 'Artifact', 'Rare', "Can purify the water in the area around", 100, 0, 'An amulet embedded with an Aqua Gem that enhances water-related abilities.'),
        ('Mythical Sword of Mother Nature', 'Weapon', 'Epic', "Can grow trees everywhere", 0, 180, 'A powerful sword blessed by Mother Nature herself, capable of protecting forests.'),
        ('Shield of Harmony', 'Shield', 'Legendary', NULL, 150, 0, 'A shield that radiates harmony, providing protection against imbalances.'),
        ('Chest Armour made of Oasis Crystal', 'Armor', 'Legendary', "Can clean all plastic wastes from the water", 250, 0, 'Chest armor crafted from rare Oasis Crystals, granting purity and strength.'),
        ('Reverdant Edge: The Divine Weapon', 'Weapon', 'Mythic', "Can bring back the mother nature earth with sustainability ", 450, 715, 'A divine weapon representing eternal sustainability and strength to embodies the everlasting essence of sustainability.');

        INSERT INTO Quest (title, description,  reward_level, reward_item,reward_itemId, reward_gold, creature_name, creature_hp, creature_dmg, difficulty, level_requirement)
        VALUES
        ('Forest Echoes', 'Clear the forest of the Smog Wraiths to bring back clean air.',5,'Dagger of Aeris', 2, 120, 'Smog Wraiths', 50, 5, 'Easy', 1),
        ('Tidal Turmoil', 'Defeat the Drain Imps to prevent water wastage and restore purity.', 9,'Amulet with Aqua Gem', 3, 90, 'Drain Imps', 20, 10, 'Easy', 1),
        ('Windswept Woes', 'Stop the Deforestation Fiends from destroying the forest.', 11,'Mythical Sword of Mother Nature', 4, 110, 'Deforestation Fiends', 90, 40, 'Medium', 6),
        ('Guardians\'' Call', 'Restore balance to the polluted lands by defeating the Gloomstalkers.', 15,'Shield of Harmony', 5, 100, 'Gloomstalkers', 85, 10, 'Medium', 8),
        ('Oasis Rescue', 'Save the oasis from the Plastic Serpent and restore its purity.', 25,'Chest Armour made of Oasis Crystal',  6, 500, 'Plastic Serpent', 80, 25, 'Hard', 9),
        ('Final Boss to save the Earth', 'Protect the mother earth from three-headed dragon which relase greeen house gases all the time.', 31,'Reverdant Edge: The Divine Weapon ', 7, 150, 'Tritaurus', 500, 75, 'Challenging', 30);
        
`;
//drop child first, update&create parent first
pool.query(SQLSTATEMENT,(error,results,fields)=>{
    if(error){
        console.error("Error creating tables: ", error);
    }else{
        console.log("Tables created successfully")
    }
})  