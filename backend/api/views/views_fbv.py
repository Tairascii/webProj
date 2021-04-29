from rest_framework.decorators import api_view
from django.http.response import JsonResponse

from django.views.decorators.csrf import csrf_exempt

from api.models import Category, SubCategory, Product, User, Comment
from api.serializers import CategorySerializer, SubCategorySerializer, ProductSerializer, UserSerializer, CommentSerializer

from rest_framework.request import Request
from rest_framework.response import Response
import json


@api_view(['GET'])
def show_cats(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def show_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# @api_view(['GET'])
# def products_by_cat(request, catId, subcatId):
#     products = Product.objects.filter(cat=catId)
#     if subcatId != 0:
#         products = products.filter(subcat=subcatId)
#     serializer = ProductSerializer(products, many=True)
#     return Response(serializer.data)


@api_view(['GET'])
def product_detail(request, prodId):
    try:
        product = Product.objects.get(id=prodId)
    except Product.DoesNotExist as e:
        return JsonResponse({'message': str(e)}, status=400)
    serializer = ProductSerializer(product)
    return Response(serializer.data)


@api_view(['GET'])
def show_subcats(request, catId):
    subcats = SubCategory.objects.filter(cat=catId)
    serializer = SubCategorySerializer(subcats, many=True)
    return Response(serializer.data)

