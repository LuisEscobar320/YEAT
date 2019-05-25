import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Adding or modifying Cuisines for every food item
def updateFoodType( diningHall , init=False):
  
  if init is False:
    # Fetch the service account key JSON file contents
    cred = credentials.Certificate('/Users/luisescobar/YEAT/yeat-dc4bc-firebase-adminsdk-4alun-1010432132.json')

    # Initialize the app with a service account
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://yeat-dc4bc.firebaseio.com/'
    })

  # Get the food items from the diningHall
  ref = db.reference()
  hall = ref.get()[diningHall]

  #Update the dining hall with type of food
  for food in hall:

    #Do not add cuisines for restrictions
    if 'Burrito' in food or 'Quesadilla' in food or 'Carn' in food or 'Nachos' in food or 'Churro' in food or 'Chips' in food or 'Tort' in food or 'Taco' in food or 'Guac' in food or 'Beans' in food:
      #Updates every food item with a particular type
      ref.child(diningHall).child(food).update({
        'Cuisine': 'Mexican'
      })
      print(food + ' is now Mexican!')
    
    #handle asian food
    elif 'Noodle' in food or 'Roll' in food or 'Rice' in food or 'Sweet' in food or 'Sui' in food or 'Hoki' in food:
      #Updates every food item with a particular type
      ref.child(diningHall).child(food).update({
        'Cuisine': 'Asian'
      })
      print(food + ' is now Asian!') 
    
    #handle Mediterranean food
    elif 'Medit' in food or 'Gyro' in food or 'Greek' in food:
      ref.child(diningHall).child(food).update({
        'Cuisine':'Mediterranean'
      })
      print(food+ ' is now Mediterranean')
    
    #handle Italian Food
    elif 'Pasta' in food or 'Italian' in food or 'Pizza' in food or 'Rat' in food:
      ref.child(diningHall).child(food).update({
        'Cuisine':'Italian'
      })
      print(food+ ' is now Italian')

    #handle Indian food
    elif 'Curry' in food or 'Masala' in food:
      ref.child(diningHall).child(food).update({
        'Cuisine':'Indian'
      })
      print(food+ ' is now Indian')   

    #handles the other items
    else:
      ref.child(diningHall).child(food).update({
        'Cuisine': 'American'
      })
      print(food + ' is now American!')


# Updated Cuisines for Certain Time for dining halls
def updateTimeFood( time ):
    
  # Fetch the service account key JSON file contents
  cred = credentials.Certificate('/Users/luisescobar/YEAT/yeat-dc4bc-firebase-adminsdk-4alun-1010432132.json')

  # Initialize the app with a service account
  firebase_admin.initialize_app(cred, {
      'databaseURL': 'https://yeat-dc4bc.firebaseio.com/'
  })

  # Get the food items from the diningHall
  ref = db.reference()

  #Get only the diningHalls at a certain time
  base = ref.get()

  #Go through every item in the base
  for diningHall in base:

    if diningHall != 'users':
      #Search for the correct time and update that halls cuisine
      if time in diningHall:
        updateFoodType(diningHall, True)
        print(diningHall + " has been updated!")

#Modifies the nutrition to have children
def ChangeNutritionToChild():

  # Fetch the service account key JSON file contents
  cred = credentials.Certificate('/Users/luisescobar/YEAT/yeat-dc4bc-firebase-adminsdk-4alun-1010432132.json')

  # Initialize the app with a service account
  firebase_admin.initialize_app(cred, {
      'databaseURL': 'https://yeat-dc4bc.firebaseio.com/'
  })

  # Get the food items from the diningHall
  ref = db.reference()

  #Get only the diningHalls at a certain time
  base = ref.get()

  #Access each dininghall
  for hall in base:

    if hall != 'users':
      #Access the foods in each hall
      food_list = ref.get()[hall]


      #Go through every food item in each dininghall
      for food_item in food_list:
        
        #Access the items under every food
        nutrition = ref.get()[hall][food_item]['Nutrition']
        
        #Go through the nutrition of every item
        for facts in nutrition:
          fact_list = facts.split()

          #Go through every nutritional fact
          for fact_item in fact_list:

            #Do not consider the ',' in the list
            if fact_item != ',':
              #update each food item to now have nutritional facts listed
              ref.child(hall).child(food_item).child('Nutrition').update({
                fact_item:1
              })
              print(hall + ' which has '+ food_item + ' now has ' + fact_item + '!')


updateTimeFood('Dinner')

            
        


