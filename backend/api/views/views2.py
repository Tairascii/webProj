from django.shortcuts import render
import json
from django.http.response import JsonResponse
from api.models import Category, SubCategory, Product, User, Comment
from django.views.decorators.csrf import csrf_exempt
from api.serializers import CategorySerializer, SubCategorySerializer, ProductSerializer, UserSerializer, CommentSerializer
from django.views import View
# Create your views here.


@csrf_exempt
def show_comments(request, product_id):
    try:
        comment = Comment.objects.get(id=product_id)
    except Comment.DoesNotExist as e:
        return JsonResponse({'message': str(e)})
    if request.method == 'GET':
        return JsonResponse(Comment.to_json())
    elif request.method == 'PUT':
        data = json.loads(request.body)
        comment.productId = data['productId']
        comment.comment = data['comment']
        comment.date = data['date']
        comment.save()
        return JsonResponse(comment.to_json())
    elif request.method == 'POST':
        data = json.loads(request.body)
        try:
            comment = Comment.objects.create(userName=data['userName'], productId=data['productId'], comment=data['comment'], date=data['date'])
        except Exception as e:
            return JsonResponse({'message': str(e)})
        return JsonResponse(comment.to_json())
    elif request.method == 'DELETE':
        comment.delete()
        return JsonResponse({'message': 'deleted'}, status=204)


def show_cats(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return JsonResponse(serializer.data, safe=False)


def show_comments(request):
    comments = Comment.objects.all()
    serializer = CommentSerializer(comments, many=True)
    return JsonResponse(serializer.data, safe=False)


def show_subCats(request):
    subCategories = SubCategory.objects.all()
    serializer = SubCategorySerializer(subCategories, many=True)
    return JsonResponse(serializer.data, safe=False)


def show_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return JsonResponse(serializer.data, safe=False)



def show_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def user_detail(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist as e:
        return JsonResponse({'message': str(e)}, status=400)
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = json.loads(request.body)
        serializer = UserSerializer(instance=user, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)

def show_comments(request):
    comments = Comment.objects.all()
    serializer = CommentSerializer(comments, many=True)
    return JsonResponse(serializer.data, safe=False)



