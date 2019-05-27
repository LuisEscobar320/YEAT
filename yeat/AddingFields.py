import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import re

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


#Move a food item to a specific user
def addInfoToFoodItemInFavorites(user,food_item, init=False):
    
  #Initialize the firebase
  if init is False:
    # Fetch the service account key JSON file content
    cred = credentials.Certificate('/Users/luisescobar/YEAT/yeat-dc4bc-firebase-adminsdk-4alun-1010432132.json')

    # Initialize the app with a service account
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://yeat-dc4bc.firebaseio.com/'
    })
  #Get the users to add an item
  ref = db.reference()
  
  #Getting all the items in the database
  all_list = ref.get()

  #Go through all the diningHalls to find food item
  for diningHall in all_list:

    hall = ref.get()[diningHall]

    #Find the item in teh hall
    for food in hall:

      #check where the is
      if food == food_item:

        #get the cost
        cost = ref.get()[diningHall][food]['cost']

        #Add items to food in favorites
        FavoriteItem = ref.get()['users'][user]['Favorites']

        #Add the item
        for item in FavoriteItem:
          if item == food_item:
            ref.child('users').child(user).child('Favorites').child(food_item).update({
              'DiningHall': hall,
              'Cost': cost
            })
            print('User with favorite food: '+ food + ' is from ' + hall + ' and costs '+cost)
            return

def restructureDiningHallsby(time,init=False):
  #Initialize the firebase
  if init is False:
    # Fetch the service account key JSON file content
    cred = credentials.Certificate('/Users/luisescobar/YEAT/yeat-dc4bc-firebase-adminsdk-4alun-1010432132.json')

    # Initialize the app with a service account
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://yeat-dc4bc.firebaseio.com/'
    })
  
  #Get the users to add an item
  ref = db.reference()
  

  #Getting all the items in the database
  all_list = ref.get()

  #Add the time to firebase
  ref.update({
    time:''
  })
  print(time)
  #Go through every hall
  for diningHall in all_list:
    if diningHall != 'user':

      #Reorganize diningHall by certain time
      if time in diningHall:
        food_list = ref.get()[diningHall]
        new_name = diningHall.replace('-'+time,'')

        #add hall to their respective list
        ref.child(time).update({
          new_name:''
        })

        #print hall
        print('  '+new_name)

        #Go through each field in every food item
        for food_item in food_list:
          facts = ref.get()[diningHall][food_item]
          fixed_food_item = ' '.join(re.sub( r'([A-Z])', r' \1', food_item).split())
          
          #Add every food item into each new hall
          ref.child(time).child(new_name).update({
            fixed_food_item:''
          })
          
          #print food
          print('    '+fixed_food_item)

          #Go through each fact item
          for fact in facts:

            #loop through all the nutrition facts
            if fact == 'Nutrition':
              nutrition_list = ref.get()[diningHall][food_item]['Nutrition']
              ref.child(time).child(new_name).child(fixed_food_item).update({
                'Nutrition':''
              })
              print('      Nutrition')
              #Go through and update the nutrition
              for nutrition in nutrition_list:
                ref.child(time).child(new_name).child(fixed_food_item).child('Nutrition').update({
                  nutrition:'1'
                })
                print('        '+nutrition)
            
            #Handle every other fact
            else:
              fact_info = ref.get()[diningHall][food_item][fact]
              ref.child(time).child(new_name).child(fixed_food_item).update({
                fact:fact_info
              })
              print('      '+ fact)

def checkIfNutritionFieldsExist(time,field):

  ref = db.reference()
  items = ref.get()[time]
  
  #Check if field exists
  for thing in items:
    if thing == field:
      return True

  #Item is not found
  return False

def catergorizeFoodBy(time,init=False):
  #Initialize the firebase
  if init is False:
    # Fetch the service account key JSON file content
    cred = credentials.Certificate('/Users/luisescobar/YEAT/yeat-dc4bc-firebase-adminsdk-4alun-1010432132.json')

    # Initialize the app with a service account
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://yeat-dc4bc.firebaseio.com/'
    })

  #Get the users to add an item
  ref = db.reference()

  #Go through time options
  breakfast = ref.get()[time]

  #Go through breakfast halls
  for diningHall in breakfast:

    #Get the food list
    breakfast_food = ref.get()[time][diningHall]
    for b_food in breakfast_food:

      #Get the nutritional items
      nutritional_items = ref.get()[time][diningHall][b_food]['Nutrition']

      #Go through the nutrition and start catergorizing each item
      for fact in nutritional_items:
        
        if fact != '0':
          #Create the field if it doesn't exist
          if checkIfNutritionFieldsExist(time,fact) == False:
            ref.child(time).update({
              fact:{
                b_food:''
              }
            })

          #Otherwise add item to said field
          else:
            ref.child(time).child(fact).update({
              b_food:''
            })

          #print message for meals
          print(b_food + ' was added to ' + fact)

        
restructureDiningHallsby('Breakfast')
restructureDiningHallsby('Lunch', True)
restructureDiningHallsby('Dinner',True)
catergorizeFoodBy('Breakfast',True)
catergorizeFoodBy('Lunch',True)
catergorizeFoodBy('Dinner',True)