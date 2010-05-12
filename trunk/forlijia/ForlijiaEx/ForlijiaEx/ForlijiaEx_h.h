

/* this ALWAYS GENERATED file contains the definitions for the interfaces */


 /* File created by MIDL compiler version 7.00.0555 */
/* at Tue May 11 23:03:30 2010
 */
/* Compiler settings for ForlijiaEx.idl:
    Oicf, W1, Zp8, env=Win32 (32b run), target_arch=X86 7.00.0555 
    protocol : dce , ms_ext, c_ext, robust
    error checks: allocation ref bounds_check enum stub_data 
    VC __declspec() decoration level: 
         __declspec(uuid()), __declspec(selectany), __declspec(novtable)
         DECLSPEC_UUID(), MIDL_INTERFACE()
*/
/* @@MIDL_FILE_HEADING(  ) */

#pragma warning( disable: 4049 )  /* more than 64k source lines */


/* verify that the <rpcndr.h> version is high enough to compile this file*/
#ifndef __REQUIRED_RPCNDR_H_VERSION__
#define __REQUIRED_RPCNDR_H_VERSION__ 475
#endif

#include "rpc.h"
#include "rpcndr.h"

#ifndef __RPCNDR_H_VERSION__
#error this stub requires an updated version of <rpcndr.h>
#endif // __RPCNDR_H_VERSION__


#ifndef __ForlijiaEx_h_h__
#define __ForlijiaEx_h_h__

#if defined(_MSC_VER) && (_MSC_VER >= 1020)
#pragma once
#endif

/* Forward Declarations */ 

#ifndef __IForlijiaEx_FWD_DEFINED__
#define __IForlijiaEx_FWD_DEFINED__
typedef interface IForlijiaEx IForlijiaEx;
#endif 	/* __IForlijiaEx_FWD_DEFINED__ */


#ifndef __ForlijiaEx_FWD_DEFINED__
#define __ForlijiaEx_FWD_DEFINED__

#ifdef __cplusplus
typedef class ForlijiaEx ForlijiaEx;
#else
typedef struct ForlijiaEx ForlijiaEx;
#endif /* __cplusplus */

#endif 	/* __ForlijiaEx_FWD_DEFINED__ */


#ifdef __cplusplus
extern "C"{
#endif 



#ifndef __ForlijiaEx_LIBRARY_DEFINED__
#define __ForlijiaEx_LIBRARY_DEFINED__

/* library ForlijiaEx */
/* [version][uuid] */ 


EXTERN_C const IID LIBID_ForlijiaEx;

#ifndef __IForlijiaEx_DISPINTERFACE_DEFINED__
#define __IForlijiaEx_DISPINTERFACE_DEFINED__

/* dispinterface IForlijiaEx */
/* [uuid] */ 


EXTERN_C const IID DIID_IForlijiaEx;

#if defined(__cplusplus) && !defined(CINTERFACE)

    MIDL_INTERFACE("46362D4D-4B19-4B41-9309-A0E840F52358")
    IForlijiaEx : public IDispatch
    {
    };
    
#else 	/* C style interface */

    typedef struct IForlijiaExVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            IForlijiaEx * This,
            /* [in] */ REFIID riid,
            /* [annotation][iid_is][out] */ 
            __RPC__deref_out  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            IForlijiaEx * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            IForlijiaEx * This);
        
        HRESULT ( STDMETHODCALLTYPE *GetTypeInfoCount )( 
            IForlijiaEx * This,
            /* [out] */ UINT *pctinfo);
        
        HRESULT ( STDMETHODCALLTYPE *GetTypeInfo )( 
            IForlijiaEx * This,
            /* [in] */ UINT iTInfo,
            /* [in] */ LCID lcid,
            /* [out] */ ITypeInfo **ppTInfo);
        
        HRESULT ( STDMETHODCALLTYPE *GetIDsOfNames )( 
            IForlijiaEx * This,
            /* [in] */ REFIID riid,
            /* [size_is][in] */ LPOLESTR *rgszNames,
            /* [range][in] */ UINT cNames,
            /* [in] */ LCID lcid,
            /* [size_is][out] */ DISPID *rgDispId);
        
        /* [local] */ HRESULT ( STDMETHODCALLTYPE *Invoke )( 
            IForlijiaEx * This,
            /* [in] */ DISPID dispIdMember,
            /* [in] */ REFIID riid,
            /* [in] */ LCID lcid,
            /* [in] */ WORD wFlags,
            /* [out][in] */ DISPPARAMS *pDispParams,
            /* [out] */ VARIANT *pVarResult,
            /* [out] */ EXCEPINFO *pExcepInfo,
            /* [out] */ UINT *puArgErr);
        
        END_INTERFACE
    } IForlijiaExVtbl;

    interface IForlijiaEx
    {
        CONST_VTBL struct IForlijiaExVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define IForlijiaEx_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define IForlijiaEx_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define IForlijiaEx_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define IForlijiaEx_GetTypeInfoCount(This,pctinfo)	\
    ( (This)->lpVtbl -> GetTypeInfoCount(This,pctinfo) ) 

#define IForlijiaEx_GetTypeInfo(This,iTInfo,lcid,ppTInfo)	\
    ( (This)->lpVtbl -> GetTypeInfo(This,iTInfo,lcid,ppTInfo) ) 

#define IForlijiaEx_GetIDsOfNames(This,riid,rgszNames,cNames,lcid,rgDispId)	\
    ( (This)->lpVtbl -> GetIDsOfNames(This,riid,rgszNames,cNames,lcid,rgDispId) ) 

#define IForlijiaEx_Invoke(This,dispIdMember,riid,lcid,wFlags,pDispParams,pVarResult,pExcepInfo,puArgErr)	\
    ( (This)->lpVtbl -> Invoke(This,dispIdMember,riid,lcid,wFlags,pDispParams,pVarResult,pExcepInfo,puArgErr) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */


#endif 	/* __IForlijiaEx_DISPINTERFACE_DEFINED__ */


EXTERN_C const CLSID CLSID_ForlijiaEx;

#ifdef __cplusplus

class DECLSPEC_UUID("61541EFC-E048-43E7-BDAF-21B8B1BEABED")
ForlijiaEx;
#endif
#endif /* __ForlijiaEx_LIBRARY_DEFINED__ */

/* Additional Prototypes for ALL interfaces */

/* end of Additional Prototypes */

#ifdef __cplusplus
}
#endif

#endif


